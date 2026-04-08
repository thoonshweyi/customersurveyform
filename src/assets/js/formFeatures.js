import { FORM_IDS,formFeatures } from "./../../store/formSlice";

const getQuestionIdsByName = (form, names = []) => {
    return form.sections
        .flatMap(section => section.questions)
        .filter(q => names.includes(q.name) || names.includes(q.en_name))
        .map(q => q.id);
};

export const getEasyQuestionIds = (form,extendedQuestionNames = []) => {
    const featureConfig = formFeatures[form.id]?.find(
        f => f.name === "easyApply"
    );

    const questionNames = [
        ...(featureConfig?.questionNames || []),
        ...extendedQuestionNames,
    ];

    return getQuestionIdsByName(form, questionNames);
};

//  Factory function
export const createFormFeatureHandlers = ({ form, setForm, questionAnswers, setQuestionAnswers }) => {

    return {
        easyApply: () => {

            const easyIds = getEasyQuestionIds(form,['Name','Phone']);

            const newForm = {
                ...form,
                sections: form.sections
                    .map(section => ({
                        ...section,
                        questions: section.questions
                            .filter(q => easyIds.includes(q.id))
                            .map(q => ({
                                ...q,
                                required: true
                            }))
                    }))
                    .filter(section => section.questions.length > 0)
            };

            setForm(newForm);
        },
        fullApply: () => {

            const easyIds = getEasyQuestionIds(form);

            const newForm = {
                ...form,
                sections: form.sections
                    .map(section => ({
                        ...section,
                        questions: section.questions
                            .filter(q => !easyIds.includes(q.id))
                            .map(q => ({
                                ...q,
                                // required: true
                            }))
                    }))
                    .filter(section => section.questions.length > 0)
            };

            setForm(newForm);
        },
        uploadCV: () => {
            console.log("Upload CV for form", form.id);
        }
    };
};
