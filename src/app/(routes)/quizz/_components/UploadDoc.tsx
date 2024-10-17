"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const UploadDoc = () => {
  const [document, setDocument] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError("Please upload the document first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", document as Blob);
    try {
      const res = await fetch("/api/quizz/generate", {
        method: "POST",
        body: formData
      });
      if (res.status === 200) {
        const data = await res.json();
        const quizzId = data.quizzId;

        router.push(`/quizz/${quizzId}`);
      }
    } catch (e) {
      console.log("error while generating", e);
    }
    setIsLoading(false);
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError("")
    }
  }

  return (
    <div className="w-1/2">
      {isLoading ? <p>Loading...</p> : <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor="document" className="w-full h-40 bg-secondary flex rounded-md border-4 border-dashed border-blue-900 relative">
          <div className="absolute inset-0 m-auto flex justify-center items-center">
            {document && document?.name ? document.name : "Drag a file"}</div>
          <input type="file" id="document" className="relative block w-full h-full z-50 opacity-0" onChange={handleDocumentUpload} />
        </label>
        <p className="text-secondary-foreground my-2">Supported file types: pdf</p>
        {error ? <p className="text-red-600">{error}</p> : null}
        <button  className="mt-2 my-2 px-4 bg-[#20232D] hover:bg-[#20232D]/70 h-10 rounded-lg justify-center items-center hover:cursor-pointer" type="submit">Generate Quizz 🪄</button>
      </form>}
    </div>
  )
}

export default UploadDoc;