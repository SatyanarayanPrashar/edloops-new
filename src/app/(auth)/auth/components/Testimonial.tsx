
import { CheckmarkIcon } from "react-hot-toast";

export const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-600 min-h-full text-white">
      <div className="3xl:w-2/3 mb-10 space-y-8 px-12 xl:px-20">
        <div>
          <h2 className="text-3xl font-bold">
            Take control of how you learn with irresistible experiences.
          </h2>
        </div>
         {/* <p className="text-slate-600">
          Make customer-centric decisions based on data.
          <br /> Keep 100% data ownership.
        </p> */}
        <div className="space-y-2">
          {/* <div className="flex space-x-2">
            <CheckmarkIcon className="text-brand-dark h-6 w-6" />
            <p className="inline text-lg"></p>
          </div>
          <div className="flex space-x-2">
            <CheckmarkIcon className="text-brand-dark h-6 w-6" />
            <p className="inline text-lg">Free and open-source</p>
          </div> */}
          <div className="flex space-x-2 items-center">
            <CheckmarkIcon className="text-brand-dark h-6 w-6" />
            <p className="inline text-lg">No credit card required</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-gradient-to-tr from-slate-100 to-slate-200 p-8">
          <p className="italic text-slate-700">
          Edloops has helped me become a better engineer.
          <span className="bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600">
          I'm able to grasp complex topics much faster than before.
          </span>
          The generated questions and instant feedback have dramatically improved my problem-solving skills and syntax understanding.
          </p>
          <div className="mt-4">
              <p className="text-lg text-slate-700">Saurav</p>
              <p className="text-sm text-slate-500">Computer Engineering Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};
