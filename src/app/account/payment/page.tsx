import { CheckCircle2, CreditCard } from "lucide-react";
import { MobileAccountHeader } from "@/components/account/MobileAccountHeader";

const RAZORPAY_ENABLED = Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

export default function PaymentMethodPage() {
  return (
    <div className="flex flex-col gap-4">
      <MobileAccountHeader title="Payment Method" />
      <h1 className="hidden font-serif text-xl font-bold text-brand-primary md:block">Payment Method</h1>

      <div className="flex items-center gap-3 rounded-2xl border border-brand-primary bg-brand-cream/50 p-5">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-leaf-green" />
        <div className="font-sans text-sm text-brand-primary">
          <p className="font-semibold">Cash on Delivery</p>
          <p className="text-xs text-brand-primary/82">Pay with cash when your order arrives. Available on every order.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-brand-sand/50 bg-white p-5 opacity-60">
        <CreditCard className="h-5 w-5 shrink-0 text-brand-primary/64" />
        <div className="font-sans text-sm text-brand-primary">
          <p className="flex items-center gap-2 font-semibold">
            Pay Online (UPI / Card)
            {!RAZORPAY_ENABLED && (
              <span className="rounded-full bg-brand-sand/60 px-2 py-0.5 font-sans text-[12px] font-semibold uppercase tracking-wider text-brand-primary">
                Coming Soon
              </span>
            )}
          </p>
          <p className="text-xs text-brand-primary/82">
            {RAZORPAY_ENABLED ? "Secure payment via Razorpay." : "Online payments are being set up."}
          </p>
        </div>
      </div>
    </div>
  );
}
