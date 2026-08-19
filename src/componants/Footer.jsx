import { Link } from 'react-router-dom'

function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-slate-50 px-6 py-8 sm:px-10">
			<div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
				<p>© 2026 DayOneHome. All rights reserved.</p>
				<Link to="/" className="font-semibold text-slate-950 transition hover:text-cyan-700">
					Back to top
				</Link>
			</div>
		</footer>
	)
}

export default Footer
