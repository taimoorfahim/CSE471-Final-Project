"use client";

import { Input } from "@/components/ui/input";
import { colorSchema } from "@/lib/ColorSchema";
import React, {useState } from "react";
import { ArrowRight, CornerRightDown } from "lucide-react";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { toast } from "@/components/ui/Toast";
import { StudentInterface } from "@/types/student";
import { useRouter } from "next/navigation";

interface StudentInputsInterface {
    studentId: string;
    phoneNumber: string;
    email: string;
    name: string;
    gender: string;
    department: string;
}

const AddNewStudent = () => {
    const styles = {
        wrapper: `my-6 p-3 flex justify-center items-center`,
        button: `${colorSchema.button} mt-6 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm 
      items-center justify-center space-x-2 hover:space-x-4 `,
        label: `leading-7 text-sm text-gray-400 w-full max-w-lg`,
        select: `w-full max-w-lg h-10 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 
      focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 p-2 leading-8 
      transition-colors duration-200 ease-in-out`,
    };

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [error, setError] = useState<string>("");



    const [StudentInputs, setStudentInputs] =
        useState<StudentInputsInterface>({
            studentId: "",
            phoneNumber: "",
            email: "",
            name: "",
            gender: "",
            department: "",
        });

    const [studentInfo, setStudentInfo] = useState<StudentInterface | null>();



    const registrationErrorHandling = (errMsg: string) => {
        toast({
            title: "Error",
            message: errMsg,
            type: "error",
        });
        setIsLoading(false);
    };

    const validateInputs = () => {


        // Validating phone number ( +880 | 01 | 00 )
        if (
            !new RegExp(/^(?:(?:\+|00)88|01)?(?:\d{11}|\d{13})$/gm).test(
                StudentInputs.phoneNumber
            )
        ) {
            setError("Invalid phone number");
            return false;
        }


        return true;
    };

    const getStudentInfo = async () => {
        if (StudentInputs.email.endsWith("@g.bracu.ac.bd")) {
            setIsLoading(true);
            // Checking if there is any student with this email
            const studentRes = await axios.get(
                `${apiEndpointV1}/student/byEmail/${StudentInputs.email}`
            );

            setStudentInfo(studentRes.data.data);
            setIsLoading(false);
        } else {
            setStudentInfo(null);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (isLoading) return;

        if (!validateInputs()) return;

        setIsLoading(true);

        try {


            await getStudentInfo();

            if (studentInfo) {
                const ans = confirm("Student already exits, do you want to update the info?")
                if (ans) {
                    const { data } = await axios.put(
                        `${apiEndpointV1}/student/${studentInfo._id}`,
                        StudentInputs
                    );
                    if (data.success) {
                        toast({
                            title: "Success",
                            message: "Student info updated successfully",
                            type: "success",
                        });
                    }
                }
                
            }
            else {
                const { data } = await axios.post(
                    `${apiEndpointV1}/student`,
                    {
                        "students": [
                            StudentInputs
                        ]
                    }
                );
                if (data.success) {
                    toast({
                        title: "Success",
                        message: "New student added successfully",
                        type: "error",
                    });
                }
            }


        } catch (err: any) {
            registrationErrorHandling(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>

            <form className="w-full max-w-lg border-2 px-5 py-8 border-indigo-500 rounded " onSubmit={handleSubmit}>
                {/* Top heading */}
                <h1 className="text-4xl font-extrabold mb-5 text-white flex space-x-2 justify-center items-center">
                    <p>Add new Student</p>
                    <CornerRightDown className="mt-8 text-indigo-500" size={46} />
                </h1>


                <div className="my-3">
                    <label className={styles.label}>
                        Name <span className="text-red-500 text-lg">*</span>
                    </label>
                    <Input
                        placeholder="Taimoor Fahim"
                        onChange={(e) => {
                            setStudentInputs({
                                ...StudentInputs,
                                name: e.target.value,
                            });
                        }}
                        required
                    />
                </div>
                <div className="my-3">
                    <label className={styles.label}>
                        G-Suite <span className="text-red-500 text-lg">*</span>
                    </label>
                    <Input
                        placeholder="***@g.bracu.ac.bd"
                        onChange={(e) => {
                            setStudentInputs({
                                ...StudentInputs,
                                email: e.target.value,
                            });
                        }}
                        required
                    />
                </div>
                <div className="my-3 flex justify-between items-center">
                    <div>
                        <label className={styles.label}>
                            Student Id <span className="text-red-500 text-lg">*</span>
                        </label>
                        <Input
                            placeholder="8 digit bracu student id"
                            onChange={(e) => {
                                setStudentInputs({
                                    ...StudentInputs,
                                    studentId: e.target.value,
                                });

                            }}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>
                            Phone Number <span className="text-red-500 text-lg">*</span>
                        </label>
                        <Input
                            placeholder="017********"
                            onChange={(e) => {
                                setStudentInputs({
                                    ...StudentInputs,
                                    phoneNumber: e.target.value,
                                });
                            }}
                            required
                        />
                    </div>

                </div>
                <div className="my-3 flex justify-evenly items-center">
                    <div className="pr-2">
                        <label className={styles.label}>
                            Gender <span className="text-red-500 text-lg">*</span>
                        </label>
                        <select
                            className={styles.select}
                            onChange={(e) => {
                                setStudentInputs({
                                    ...StudentInputs,
                                    gender: e.target.value,
                                });
                            }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="pl-2">
                        <label className={styles.label}>
                            Department <span className="text-red-500 text-lg">*</span>
                        </label>
                        <select
                            className={styles.select}
                            onChange={(e) => {
                                setStudentInputs({
                                    ...StudentInputs,
                                    department: e.target.value,
                                });
                            }}
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="CS">CS</option>
                            <option value="EEE">EEE</option>
                            <option value="BBA">BBA</option>
                            <option value="ECO">ECO</option>
                        </select>
                    </div>
                </div>




                {/* Error msg */}
                {error !== "" && (
                    <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
                )}

                {/* Confirmation button */}
                <button
                    className={`${styles.button} disabled:bg-opacity-50 disabled:cursor-not-allowed`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <p>Loading...</p>
                        </>
                    ) : (
                        <>
                            <p>Confirm</p>
                            <ArrowRight />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddNewStudent;
