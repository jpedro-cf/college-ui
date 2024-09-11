import { PulseLoader } from 'react-spinners'

export function LoadingPage() {
    return (
        <div className="w-full min-h-screen block bg-slate-100 flex items-center justify-center">
            <PulseLoader color="#7c3aed" size={24} />
        </div>
    )
}
