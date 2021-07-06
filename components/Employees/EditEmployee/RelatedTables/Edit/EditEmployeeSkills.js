import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import FormikControl from "../../../../FormComponents/FormikControl";

const EditEmployeeSkills = ({
  employeeId,
  skillCategories,
  skillLevel,
  editSkill,
}) => {
  const toast = useRef(null);
  const initialValues = editSkill;

  //    -----------Options----------------

  const dropDownForSkillCategories = [{ key: "Skill Category", value: "" }];
  skillCategories.map((skillCategory) => {
    let obj1 = {};
    obj1["key"] = skillCategory.key;
    obj1["value"] = skillCategory.value;
    dropDownForSkillCategories.push(obj1);
  });

  const dropdownForSkillLevel = [{ key: "Select Skill Value", value: "" }];
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
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_skills?id=eq.${editSkill.id}`;

  const editEmployeeSkills = (data) => {
    return axios.patch(url, data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    });
  };

  const mutation = useMutation(editEmployeeSkills, {
    onMutate: (variables) => {
      console.log("onmutate", variables);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", variables, data);
    },
    onSettled: (data, error) => {
      console.log("onSettled", data, error);
      if (data) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Skills Updated",
          life: 3000,
        });
      }
    },
  });

  const onSubmit = (data, submitProps) => {
    mutation.mutate(data);
    submitProps.setSubmitting(false);
    // submitProps.resetForm()
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
                id="editSkills"
                name="form"
                className="formGridModal"
                autoComplete="off"
              >
                <div>
                  <FormikControl
                    control="select"
                    label="Skill Category"
                    name="skill_category    "
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

                <div className="text-right mt-5  col-span-2 mr-20 ">
                  <button
                    type="submit"
                    className="bg-blue-900 text-blue-100 font-bold py-2 px-8 lg:px-12 rounded-sm"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default EditEmployeeSkills;
