import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";
import { mutate } from "swr";

const AddEmployeeSkills = ({ employeeId, skillCategories, skillLevel }) => {
  const toast = useRef(null);
  const initialValues = {
    employee_id: employeeId,
    name: "",
    description: "",
  };

  //    -----------Options----------------

  const dropDownForSkillCategories = [{ key: "Skill Category", value: "" }];
  skillCategories.map((skillCategory) => {
    let obj1 = {};
    obj1["key"] = skillCategory.key;
    obj1["value"] = skillCategory.value;
    dropDownForSkillCategories.push(obj1);
  });

  const dropdownForSkillLevel = [{ key: "Select Skill Level", value: "" }];
  skillLevel.map((skill) => {
    let obj2 = {};
    obj2["key"] = skill.key;
    obj2["value"] = skill.value;
    dropdownForSkillLevel.push(obj2);
  });

  // ---------------validation Schema------------------------

  const validationSchema = Yup.object({});

  // -----------Post data-----------------

  const queryClient = useQueryClient();
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_skills`;

  const addEmployeeSkills = (data) => {
    return axios.post(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  

  const onSubmit = async (data, submitProps) => {
    try {
      const res = await mutate(url, addEmployeeSkills(data));
      console.log(res);

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Skills Added",
        life: 3000,
      });
    } catch (error) {
        console.log(error);
    }
    submitProps.setSubmitting(false);
    submitProps.resetForm()
  };

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <div className="justify-items-center container w-full mx-auto">
              <Form
                id="AddEmployeeSkills"
                name="form"
                className="formGridModal"
                autoComplete="off"
              >
                <div>
                  <FormikControl
                    control="select"
                    label="Skill Category"
                    name="skill_category"
                    options={dropDownForSkillCategories}
                  />
                </div>

                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Name"
                    name="name"
                  />
                </div>

                <div className="col-span-2">
                  <FormikControl
                    control="textarea"
                    type="text"
                    label="Description"
                    name="description"
                  />
                </div>

                <div>
                  <FormikControl
                    control="select"
                    label="Skill Level"
                    name="skill_level"
                    options={dropdownForSkillLevel}
                  />
                </div>

                {/* <div className="text-right mt-5  col-span-2 mr-20 ">
            <button
              type="submit"
              className="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </div> */}
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEmployeeSkills;
