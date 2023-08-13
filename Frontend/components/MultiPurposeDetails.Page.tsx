import React, { useState } from "react";
import { SeminarInterface } from "@/types/seminar";

import MultiPurposeRegistrationModal from "./MultiPurposeRegistration.Modal";
import Image from "next/image";

const MultiPurposeDetailsPage = ({
  props,
}: {
  props: SeminarInterface
}) => {
  const isSeminar = (
    props: SeminarInterface
  ): props is SeminarInterface => "name" in props;

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState<boolean>(false);

  const makeLine = (text: string) => {
    return (
      <>
        {text.split("\n").map((nl: string, index: number) => (
          <p key={index}>{nl}</p>
        ))}
      </>
    );
  };
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={props.image}
        />
        {(
          <h3 className="tracking-widest bg-indigo-400 w-fit p-1 px-2 rounded text-white my-1 text-xs font-medium title-font uppercase">
            slot: {props.slot} ({props.time})
          </h3>
        )}
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-white">
            {props.name}
          </h1>

          <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">
            {isSeminar(props) ? "Details" : "Objective"}
          </h1>
          <p className="leading-relaxed text-md font-semibold mb-8">
            {
              makeLine(props.details)
            }
          </p>

          <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">
            {isSeminar(props) ? "Key Speaker" : "Facilitators"}
          </h1>
          <div>
            {
              <p>{props.keySpeaker}</p>
            }
          </div>

          <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">
            Date And Time
          </h1>
          <p className="text-md font-semibold">
            {props.date}
          </p>

          <h1 className="my-4 text-indigo-500 font-bold text-lg uppercase">
            Venue
          </h1>
          <p className="text-md font-semibold">{props.venue}</p>

          <h1 className="my-4 text-indigo-500 font-bold text-lg">
            SEAT STATUS
          </h1>
          <p className="text-md font-semibold">{`${props.registeredStudents.length} / ${props.seatLimit}`}</p>
          <div className="flex justify-center mt-4">
            <button
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={() => setIsRegistrationModalOpen(true)}
            >
              Register
            </button>
          </div>

          {
            <MultiPurposeRegistrationModal
              isOpen={isRegistrationModalOpen}
              setIsOpen={setIsRegistrationModalOpen}
              options={new Array(props)}
              dedicated={true}
            />
          }
        </div>
      </div>
    </section>
  );
};

export default MultiPurposeDetailsPage;
