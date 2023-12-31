"use client";

import { Input } from "@/components/ui/input";
import { colorSchema } from "@/lib/ColorSchema";
import React, { useEffect, useState } from "react";
import { ArrowRight, CornerRightDown } from "lucide-react";
import axios from "axios";
import { apiEndpointV1 } from "@/lib/ApiEndpoints";
import { toast } from "@/components/ui/Toast";
import { Progress } from "@/components/ui/progress";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { StudentInterface } from "@/types/student";
import { ActivityStateInterface } from "@/types/activityState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudentInfoDisplayer from "@/components/StudentInfoDisplayer";
// import { useSession } from "next-auth/react";

interface RegistrationInputsInterface {
  email: string;
  phoneNumber: string;
  activityId: string|any;
}
interface PageParams {
  params: {
    id: string;
  } | null;
}

const progressEmojis = ["👍", "😎", "🤩", "🚀", "🔥"];

const RegisterActivity = ({ params }: PageParams) => {
  console.log(params);
  const styles = {
    wrapper: `flex space-y-4 min-h-screen flex-col items-center justify-center py-24 mx-2`,
    button: `${colorSchema.button} mt-6 flex py-3 w-full max-w-lg font-extrabold text-xl rounded-sm 
      items-center justify-center space-x-2 hover:space-x-4 `,
    label: `leading-7 text-sm text-gray-400`,
    select: `w-full max-w-lg h-12 bg-gray-800 rounded-sm border border-gray-700 focus:border-indigo-500 
      focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 
      transition-colors duration-200 ease-in-out`,
  };

  // const { data: session } = useSession();

  // console.log('email', session?.user?.email);

  const router = useRouter();

  const [isTCChecked, setIsTCChecked] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const [showTC, setShowTC] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [progressCounter, setProgressCounter] = useState({
    step: 1,
    i1: 0,
    i2: 0,
    i3: 0,
  });

  const [activities, setActivities] = useState<ActivityStateInterface[]>([]);

  const [registrationInputs, setRegistrationInputs] =
    useState<RegistrationInputsInterface>({
      email: "",
      phoneNumber: "",
      activityId: params?.id ,
    });

  const [studentInfo, setStudentInfo] = useState<StudentInterface | null>();

  useEffect(() => {
    const getActivities = async () => {
      const regInfo = await axios.get(`${apiEndpointV1}/admin?session=Summer2023`)
      const res = await axios.get(`${apiEndpointV1}/activityState?activityId=${params?.id}`);
      setActivities(res.data.data);
      setIsOpen(regInfo.data.data[0].isRegistrationOpen)
    };


    getActivities();
  }, []);

  useEffect(() => {
    const getStudentInfo = async () => {
      if (registrationInputs.email.endsWith("@g.bracu.ac.bd")) {
        setIsLoading(true);
        // Checking if there is any student with this email
        const studentRes = await axios.get(
          `${apiEndpointV1}/student/byEmail/${registrationInputs.email}`
        );

        setStudentInfo(studentRes.data.data);
        setIsLoading(false);
      } else {
        setStudentInfo(null);
      }
    };
    getStudentInfo();
  }, [registrationInputs.email]);

  const updateProgressCounter = (
    atr: "i1" | "i2" | "i3",
    value: string
  ) => {
    const up = progressCounter;
    if (value !== "") {
      up[`${atr}`] = Math.min(1, up[`${atr}`] + 1);
    } else {
      up[`${atr}`] = Math.max(0, up[`${atr}`] - 1);
    }

    up.step = up.i1 + up.i2 + up.i3 + 1;
    setProgressCounter(up);
  };

  const registrationErrorHandling = (errMsg: string) => {
    toast({
      title: "Error",
      message: errMsg,
      type: "error",
    });
    setIsLoading(false);
  };

  const validateInputs = () => {
    if (registrationInputs.activityId === "") {
      setError("You must select an activity");
      return false;
    }

    if (!isTCChecked) {
      setError("Without accepting terms and conditions, you can not register");
      return false;
    }

    // Validating phone number ( +880 | 01 | 00 )
    if (
      !new RegExp(/^(?:(?:\+|00)88|01)?(?:\d{11}|\d{13})$/gm).test(
        registrationInputs.phoneNumber
      )
    ) {
      setError("Invalid phone number");
      return false;
    }

    // Checking if there is any student with this email
    if (studentInfo === null) {
      registrationErrorHandling("Invalid Email iD, check and try again");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (isLoading) return;

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      if (!studentInfo?._id) return;

      // Registering user to the activity
      const regObj = {
        activityId: registrationInputs.activityId,
        studentId: studentInfo._id,
        // session: "Summer2023", default in  model, so no need
        newPhoneNumber: registrationInputs.phoneNumber,
      };

      const { data } = await axios.post(
        `${apiEndpointV1}/registration`,
        regObj
      );
      const { smsResponse, registration } = data.data;
      if (data.success === true && smsResponse[0].status === "SENT") {
        toast({
          title: "Success",
          message: smsResponse[0].message,
          type: "success",
        });
      }
      router.push(`/registration/${registration._id}`)
    } catch (err: any) {
      registrationErrorHandling(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      {
        isOpen ? <form className="w-full max-w-lg border-2 px-5 py-8 border-indigo-500 rounded" onSubmit={handleSubmit}>
          {/* Top heading */}
          <h1 className="text-4xl font-extrabold mb-5 text-white flex space-x-2 justify-center items-center">
            <p>Register Activity</p>
            <CornerRightDown className="mt-8 text-indigo-500" size={46} />
          </h1>

          {/* G Suite taker input */}
          <div className="my-3">
            <label className={styles.label}>
              G-Suite <span className="text-red-500 text-lg">*</span>
            </label>
            <Input
              placeholder="***@g.bracu.ac.bd"
              onChange={(e) => {
                setRegistrationInputs({
                  ...registrationInputs,
                  email: e.target.value,
                });
                updateProgressCounter("i1", e.target.value);
              }}
              required
            />
          </div>

          {/* Phone number taker input */}
          <div className="my-3">
            <label className={styles.label}>
              Phone Number <span className="text-red-500 text-lg">*</span>
            </label>
            <Input
              placeholder="01********"
              onChange={(e) => {
                setRegistrationInputs({
                  ...registrationInputs,
                  phoneNumber: e.target.value,
                });
                updateProgressCounter("i2", e.target.value);
              }}
              required
            />
          </div>

          {/* Activity taker dropdown */}
          <div className="my-3">
            <label className={styles.label}>
              Select an Activity <span className="text-red-500 text-lg">*</span>
            </label>
            <select
              id="large"
              className={styles.select}
              onChange={(e) => {
                setRegistrationInputs({
                  ...registrationInputs,
                  activityId: e.target.value,
                });
              }}
            >
              {activities.map((activity: ActivityStateInterface) => (
                <option key={activity.activityId._id} value={activity.activityId._id}>
                  {activity.activityId.name} ({activity.activityId.day})
                </option>
              ))}
            </select>
          </div>

          {/* T/C taker checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500"
              checked={isTCChecked}
              onChange={(e) => {
                setIsTCChecked(e.target.checked);
                setShowTC(true)
                updateProgressCounter("i3", e.target.checked ? "rr" : "");
              }}
            />
            <label htmlFor="radio-button" className={`${styles.label} cursor-pointer no-underline hover:underline decoration-indigo-500`} onClick={() => setShowTC(!showTC)}>
              I Agree with the terms and conditions{" "}
              <span className="text-red-500 text-lg">*</span>
            </label>
          </div>
          {
            showTC && <div className="my-2 p-2 text-white border-2 border-indigo-500 rounded">
              <h1 className='text-sm font-bold'>Terms and conditions</h1>
              <p className='text-xs font-semibold'>1. You must confirm your payment after completion of Activity registration.</p>
              <p className='text-xs font-semibold'>2. If you fail to attend two classes, you will not receive the certificate.</p>
              <p className='text-xs font-semibold'>3. You will be marked as absent if you are late for 5 minutes in your class.</p>
            </div>
          }

          {/* Progressbar changes based on students inputs */}
          <Progress value={progressCounter.step * 25} className="mt-2" />
          <p className={styles.label}>
            {progressCounter.step}/4 {progressEmojis[progressCounter.step - 1]}
          </p>

          {/* Error msg */}
          {error !== "" && (
            <p className="my-2 text-sm font-semibold text-red-500">{error}</p>
          )}

          {/* Student info based on valid G-Suite  */}
          {studentInfo && <StudentInfoDisplayer studentInfo={studentInfo} />}

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
        </form> : <>

          {
            isOpen === null ? <LoadingSpinner /> :
              <div>
                <h1 className="text-3xl font-bold text-white">Registration for RS activities is<span className="text-indigo-500 uppercase"> Closed </span></h1>

              </div>
          }
        </>
      }
    </div>
  );
};

export default RegisterActivity;
