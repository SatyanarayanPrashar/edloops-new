
import { redirect } from 'next/navigation'
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from 'next-auth'
import UploadDoc from '../_components/UploadDoc';

const page = async () => {
    const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId) {
    // signIn();
    redirect('/api/auth/signin');
    return;
  }
//   const subscribed: boolean | null | undefined = await getUserSubscription({  })

  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
        {
          <>
            <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
            <UploadDoc />
          </>
        }
      </main>
    </div>
  )
}

export default page;