import { SeminarInterface } from "@/types/seminar";
import React, { useState } from "react";

import { Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { colorSchema } from "@/lib/ColorSchema";
import Image from "next/image";

const MultiPurposeCard = ({
  props,
}: {
  props: SeminarInterface ;
}) => {
  const styles = {
    button: `${colorSchema.button} mx-auto mb-4 flex py-2 w-full max-w-lg font-extrabold text-xl rounded-sm items-center justify-center space-x-2 hover:space-x-4 cursor-pointer`,
  };

  const isSeminar = (
    props: SeminarInterface
  ): props is SeminarInterface => "name" in props;

  return (
    <div className="p-2 md:w-1/3">
      <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
        {/* <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={props.image}
          alt="Seminar Image"
          style={{ objectFit: "contain" }}
        /> */}
        <Image
          alt="Seminar Image"
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={props.image}
          quality={100}
          height={100}
          width={200}
          style={{ objectFit: "contain" }}
        />
        <div className="p-6">
          {(
            <div className="flex justify-between flex-wrap">
              <h3 className="tracking-widest bg-indigo-400 w-fit p-1 px-2 rounded text-white my-1 text-xs font-medium title-font uppercase">
                slot: {props.slot} ({props.time})
              </h3>
              {/* {
                isSeminar(props) && <h3 className="tracking-widest bg-indigo-400 w-fit p-1 px-2 rounded text-white my-1 text-xs font-medium title-font uppercase">
                {props.type} { props.type === "mandatory" && '(1/4)' }
              </h3>
              } */}
            </div>
          )}
          <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase flex flex-wrap justify-between">
            <div className="flex items-center space-x-1">
              <Clock />{" "}
              <p>
                {props.date}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin /> <p>{props.venue}</p>
            </div>
          </h3>
          <h1 className="title-font text-xl md:text-2xl font-bold text-white mb-3 h-16 truncate-text-2-lines">
            {props.name}
          </h1>
          <p className="leading-relaxed mb-3 truncate-text-3-lines">
            {props.details}
          </p>
          <div className="flex items-center flex-wrap ">
            <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md pr-3 py-1">
              <Users className="mr-1" />
              {props.registeredStudents.length} {`/ ${props.seatLimit}`}
            </span>
          </div>
        </div>
        <div className="mx-6">
          <Link
            href={`/${!isSeminar(props) ? "workshops" : "seminars"}/${props._id
              }`}
            className={styles.button}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MultiPurposeCard;
