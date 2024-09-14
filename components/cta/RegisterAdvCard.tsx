import Image from 'next/image'
import BrandLogoImage from '@/public/assets/icons/icon-192x192.png'
import MessageBubble from '@/components/ui-custom/messagebubble'

export default function RegisterAdvCard() {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <Image
        src={BrandLogoImage}
        width={28}
        height={28}
        alt="Brand Logo"
        className="rounded-md"
      />
      <h1 className="mt-2 text-lg font-semibold text-neutral-900">
        느낌으로 물어보기.
      </h1>
      <p className="font-regular mt-2 text-sm text-neutral-500">
        원하는 글꼴을 AI에게 물어보면 대신 찾아드려요.
      </p>
      {/* <MessageBubble text="How are you?" />
      <MessageBubble text="This is a longer message to test the bubble's stretching." /> */}
    </div>
  )
}
