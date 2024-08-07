"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Image from "next/image";
import Link from "next/link";
import cvhero from "../assets/cvhero.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  getEducation,
  addStoreExperience,
  addStoreEducation,
  addStoreSkill,
  getExperience,
  getSkills,
  getSummary,
} from "../features/userInfoSlice";
import { title } from "process";

import { ExperienceType, SkillType, eduType } from "../types";

const Experience = ({ id }: { id: number }) => {
  const {
    education: storeEducation,
    skill: storeSkill,
    summary: storeSummary,
    experience: storeExperience,
  } = useSelector((state: RootState) => state.userInfo);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [experience, setExperience] =
    useState<ExperienceType[]>(storeExperience);

  const [education, setEducation] = useState<eduType[]>(storeEducation);
  // const [expCount, setExpCount] = useState(1)
  const [summary, setSummary] = useState<string>(storeSummary);

  const [skills, setSkills] = useState<SkillType[]>(storeSkill);
  // console.log(workExperience)
  const addExperience = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addStoreExperience({
        id: experience.length + 1,
        title: "",
        city: "",
        company: "",
        description: "",
      })
    );
    setExperience([
      ...experience,
      {
        id: experience.length + 1,
        title: "",
        city: "",
        company: "",
        description: "",
      },
    ]);
    // setExpCount(expCount + 1)
  };
  const addEducation = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addStoreEducation({
        id: education.length + 1,
        specialization: "",
        school: "",
        description: "",
        to: "",
        from: "",
      })
    );
    setEducation([
      ...education,
      {
        id: education.length + 1,
        specialization: "",
        school: "",
        description: "",
        to: "",
        from: "",
      },
    ]);
    // setExpCount(expCount + 1)
  };

  const focusRef = useRef<HTMLInputElement>(null);
  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addStoreSkill({
        id: skills.length + 1,
        level: "",
        skill: "",
      })
    );
    setSkills([
      ...skills,
      {
        id: skills.length + 1,
        level: "",
        skill: "",
      },
    ]);
    focusRef.current?.focus();
  };

  const updateFieldChanged =
    (exp: ExperienceType, index: number) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      let newArr = [...experience];
      newArr[index] = {
        ...exp,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      };
      setExperience(newArr);
    };

  const updateFieldChangedTextArea =
    (exp: ExperienceType, index: number) =>
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      let newArr = [...experience];
      newArr[index] = {
        ...exp,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      }; // replace e.target.value with whatever you want to change it to

      setExperience(newArr);
    };
  const updateFieldEducation =
    (edu: eduType, index: number) => (e: React.FormEvent<HTMLInputElement>) => {
      let newEdu = [...education];
      newEdu[index] = {
        ...edu,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      }; // replace e.target.value with whatever you want to change it to

      setEducation(newEdu);
    };

  const updateFieldEducationTextArea =
    (edu: eduType, index: number) =>
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      let newEdu = [...education];
      newEdu[index] = {
        ...edu,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      }; // replace e.target.value with whatever you want to change it to

      setEducation(newEdu);
      // console.log(education);
    };

  const updateFieldSkills =
    (skill: SkillType, index: number) =>
    (e: React.FormEvent<HTMLInputElement>): void => {
      // console.log('index: ' + index);
      // console.log('property name: '+ e.target.name);
      let newSkill = [...skills]; // copying the old datas array
      // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
      newSkill[index] = {
        ...skill,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
          .value,
      }; // replace e.target.value with whatever you want to change it to
      // console.log(newArr)
      setSkills(newSkill);
    };
  const updateFieldLevel =
    (skill: SkillType, index: number) =>
    (e: React.FormEvent<HTMLSelectElement>): void => {
      let newSkill = [...skills]; // copying the old datas array
      // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
      newSkill[index] = {
        ...skill,
        [(e.target as HTMLSelectElement).name]: (e.target as HTMLSelectElement)
          .value,
      }; // replace e.target.value with whatever you want to change it to
      // console.log(newArr)
      setSkills(newSkill);
    };

  const experienceHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getExperience(experience));
    dispatch(getEducation(education));
    dispatch(getSkills(skills));
    dispatch(getSummary(summary));
    router.push(`/template/${id}/preview`);
  };
  // console.log(expAr);

  return (
    <div className="w-11/12 pb-8 mx-auto">
      <div className="bg-white px-4 py-4 md:py-8 rounded-md mb-2">
        <h2 className="text-2xl font-semibold">Experience</h2>
      </div>
      <div className="flex space-x-8 items-start">
        <form
          className="w-full bg-white px-4 py-8 rounded-md md:w-8/12"
          action=""
        >
          <label className="text-xl font-semibold">Proffesional Summary</label>
          <p className="text-sm py-6 text-black/50">
            Write 2-4 short sentences to summarize your resume and interest the
            reader! Mention your title, number of years of experience, if any,
            and most importantly - your most important achievements, best
            qualities or skill.
          </p>
          <textarea
            // onChange={(e) => {
            //   setExperienceInfo({ ...experienceInfo, summary: e.target.value });
            // }}
            value={summary}
            name="summary"
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            placeholder="write here"
            className="w-full h-[10rem] p-2 outline-none rounded-md border border-gray-300"
          ></textarea>

          {experience.map((exp, i) => (
            <div key={i}>
              <div className="border-t  mt-4 py-2 border-gray-300">
                <div className="text-xl font-semibold">
                  Work Experience {i + 1}
                </div>
                <p className="text-sm py-6 text-black/50">
                  Add the jobs or positions you have held. In the description
                  talk about your best achievements and the tasks you were
                  doing.
                </p>
              </div>
              <div className="flex border-t border-gray-300 flex-col md:space-x-4 items-center md:flex-row">
                <div className="relative w-full mt-5">
                  <input
                    onChange={updateFieldChanged(exp, i)}
                    type="text"
                    name="title"
                    value={exp.title}
                    placeholder="title"
                    className="peer float-input"
                    autoComplete="off"
                  />
                  <label className="float-label">Title/Position</label>
                </div>
                <div className="relative w-full mt-5">
                  <input
                    onChange={updateFieldChanged(exp, i)}
                    type="text"
                    name="city"
                    value={exp.city}
                    placeholder="city"
                    className="peer float-input"
                    autoComplete="off"
                  />
                  <label className="float-label">City/Country</label>
                </div>
              </div>

              <div className="relative w-full mt-5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={exp.company}
                  placeholder="company"
                  className="float-input peer"
                  autoComplete="off"
                  onChange={updateFieldChanged(exp, i)}
                />
                <label className="float-label">Company/Organization</label>
              </div>

              <div className="flex flex-col md:space-x-4 items-center md:flex-row">
                <div className="relative w-full mt-5">
                  <input
                    type="month"
                    name="from"
                    value={exp.from}
                    id="from"
                    onChange={updateFieldChanged(exp, i)}
                    className="peer float-input"
                  />

                  <label className="float-label">From</label>
                </div>
                <div className="relative w-full mt-5">
                  <input
                    type="month"
                    name="to"
                    id="to"
                    value={exp.to}
                    onChange={updateFieldChanged(exp, i)}
                    className="peer float-input"
                  />

                  <label className="float-label">To</label>
                </div>
              </div>
              <div className="text-gray-500 pt-6">
                To create bullet points, add each description on a new line by
                pressing the{" "}
                <span className="p-1 font-bold border rounded-md border-gray-300">
                  Enter
                </span>{" "}
                key{" "}
              </div>
              <div className="relative my-5">
                <label className="float-label">Description</label>
                <textarea
                  name="description"
                  placeholder="write here"
                  onChange={updateFieldChangedTextArea(exp, i)}
                  value={exp.description}
                  className="w-full h-[10rem] p-2 outline-none rounded-md border border-gray-300"
                ></textarea>
              </div>
            </div>
          ))}
          <button onClick={addExperience} className="text-vert font-semibold">
            Add more experience +
          </button>

          {education.map((edu, i) => (
            <div key={i}>
              <div className="border-y mt-8 py-2 border-gray-300">
                <div className="text-xl font-semibold">Education {i + 1}</div>
                <p className="text-sm py-6 text-black/50">
                  Add your educational qualification, such as a university
                  degree, master's degree and doctorate. Do not add a high
                  school diploma unless you have not completed your university
                  studies.
                </p>
              </div>
              <div className="flex flex-col md:space-x-4 items-center md:flex-row">
                <div className="relative w-full mt-5">
                  <input
                    type="text"
                    onChange={updateFieldEducation(edu, i)}
                    name="specialization"
                    id="specialization"
                    value={edu.specialization}
                    placeholder="specialization"
                    className="float-input peer"
                    autoComplete="off"
                  />
                  <label className="float-label">Specialization/Degree</label>
                </div>
                <div className="relative w-full mt-5">
                  <input
                    type="text"
                    name="school"
                    onChange={updateFieldEducation(edu, i)}
                    id="school"
                    value={edu.school}
                    placeholder="University/school"
                    className="peer float-input"
                  />

                  <label className="float-label">School/University</label>
                </div>
              </div>
              <div className="flex flex-col md:space-x-4 items-center md:flex-row">
                <div className="relative w-full mt-5">
                  <input
                    type="month"
                    name="from"
                    id="from"
                    value={edu.from}
                    onChange={updateFieldEducation(edu, i)}
                    className="peer float-input"
                  />

                  <label className="float-label">From</label>
                </div>
                <div className="relative w-full mt-5">
                  <input
                    type="month"
                    name="to"
                    id="to"
                    value={edu.to}
                    onChange={updateFieldEducation(edu, i)}
                    className="peer float-input"
                  />

                  <label className="float-label">To</label>
                </div>
              </div>
              <div className="relative mt-5">
                <label className="float-label">Description</label>
                <textarea
                  name="description"
                  value={edu.description}
                  onChange={updateFieldEducationTextArea(edu, i)}
                  placeholder="write here"
                  className="w-full h-[10rem] p-2 outline-none rounded-md border border-gray-300"
                ></textarea>
              </div>
            </div>
          ))}

          <button onClick={addEducation} className="text-vert font-semibold">
            Add more education +
          </button>

          {/* Skills start */}
          <div className="border-y mt-8 py-2 border-gray-300">
            <div className="text-xl pt-4 font-semibold">Skills</div>
            <p className="text-sm py-6 text-black/50">
              Show your relevant experience (last 10 years). Use bullet points
              to note your achievements, if possible - use numbers/facts
              (Achieved X, measured by Y, by doing Z).
            </p>
          </div>
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex flex-col md:space-x-4 items-center md:flex-row">
                <div className="relative w-full mt-5">
                  <input
                    type="text"
                    name="skill"
                    id="skill"
                    value={skill.skill}
                    ref={focusRef}
                    onChange={updateFieldSkills(skill, i)}
                    placeholder="skill"
                    className="float-input peer"
                    autoComplete="off"
                  />
                  <label className="float-label">Skill</label>
                </div>
                <div className="relative w-full mt-5">
                  <label className="float-label">Level</label>

                  <select
                    value={skill.level}
                    className="float-input"
                    onChange={updateFieldLevel(skill, i)}
                    name="level"
                    id="level"
                  >
                    <option value="">Select skill level</option>
                    <option value="beginner">Beginner</option>
                    <option value="good">Good</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button onClick={addSkill} className="text-vert mt-4 font-semibold">
            Add more skills +
          </button>
          {/* skills end */}
        </form>
        <div className="w-4/12 md:flex flex-col rounded-md items-center bg-white px-4 py-8 hidden">
          <Image width={200} height={200} alt="resume" src={cvhero} />
          <h3 className="text-2xl font-normal my-6">Work Experience Tips</h3>
          <ul role="list" className="md:space-y-4">
            <li className="list-disc text-sm ml-6">
              The section you deem unnecessary, leave it blank and will not
              appear on your resume.
            </li>
            <li className="list-disc text-sm ml-6">
              In work experience, start with your last job and work up to your
              first job (in reverse chronological order).
            </li>
            <li className="list-disc text-sm ml-6">
              Having trouble writing the introduction to your resume
              (professional summary)? Read this article: How to write a CV
              Introduction with Examples
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full my-8 md:w-8/12 flex flex-col-reverse gap-y-4 md:flex-row md:space-x-8">
        <Link href={`/template/${id}/user`}>
          <button className="bg-transparent w-full border border-vert rounded-md font-semibold text-lg text-vert md:w-[14rem] h-14">
            Back
          </button>
        </Link>
        {/* <Link href={`/template/${id}/preview`}> */}
        <button
          onClick={experienceHandler}
          className="bg-vert rounded-md font-semibold text-lg text-white w-full md:w-[14rem] h-14"
        >
          Save and Continue
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Experience;
