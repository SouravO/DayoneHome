import { Link } from "react-router-dom"

function Career() {
    return (
        <main className="bg-[#F4F1DF] text-[#221F1F]">
            <section className="flex min-h-[calc(100svh-5rem)] items-center px-6 py-24 sm:px-10 lg:px-16 2xl:px-24">
                <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#DD3027]">
                            Careers at Day One
                        </p>
                        {/* 1. Updated title with reduced size and line breaks to match the image */}
                        <h1 className="max-w-5xl text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[1.1] tracking-[-0.055em]">
                            Build What&apos;s Next.
                        </h1>
                        {/* 2. Changed description text to reflect 'no current openings' */}
                        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-[#221F1F]/70 sm:text-2xl">
                            While we are not actively hiring for any open roles at this time, we are always open to connecting with exceptional individuals who believe in building long-term value.
                        </p>
                    </div>

                    <div className="border-l-2 border-[#DD3027] pl-6 lg:col-span-4 lg:pl-8">
                        {/* 3. Slightly modified text on the right side to align with inviting tone */}
                        <p className="text-lg leading-relaxed text-[#221F1F]/70">
                            We are always interested in meeting thoughtful operators, builders and specialists. If you believe your skills would be a great fit for future roles, please feel free to reach out and introduce yourself.
                        </p>
                        <Link
                            to="/contact"
                            className="mt-8 inline-flex items-center border border-[#221F1F]/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[#DD3027] hover:bg-[#DD3027] hover:text-[#F4F1DF]"
                        >
                            Start a conversation <span className="ml-4 text-base">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Career