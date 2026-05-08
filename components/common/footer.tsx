import Link from "next/link";

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SparkleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 ml-0.5 mt-0.5"
  >
    <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br  from-rose-800 to-rose-500 text-white shadow-sm">
                <SparkleIcon />
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-900">
                Summora<span className="text-rose-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              AI-powered summarization that distills the web into what matters.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Built by Ujjwal Mishra
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/in/ujjwalmishra102"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-sm transition-all duration-200"
              >
                <LinkedInIcon />
                <span className="text-sm font-medium">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/ujjwalofficial102"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:shadow-sm transition-all duration-200"
              >
                <GitHubIcon />
                <span className="text-sm font-medium">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent mb-6" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>
            © {currentYear}{" "}
            <span className="text-gray-600 font-medium">SummoraAI</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <SparkleIcon />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
