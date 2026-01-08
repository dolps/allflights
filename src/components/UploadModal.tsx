import { useState } from 'react'
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { parseGPX, uploadActivity } from '../lib/activities'

interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<'idle' | 'parsing' | 'uploading' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile && selectedFile.name.endsWith('.gpx')) {
            setFile(selectedFile)
            setError(null)
            setStatus('idle')
        } else {
            setError('Please select a valid .gpx file')
        }
    }

    const handleUpload = async () => {
        if (!file) return

        try {
            setStatus('parsing')
            const reader = new FileReader()
            reader.onload = async (e) => {
                try {
                    const xml = e.target?.result as string
                    const stats = parseGPX(xml)

                    setStatus('uploading')
                    await uploadActivity(stats, file)

                    setStatus('success')
                    setTimeout(() => {
                        onSuccess()
                        onClose()
                        // Reset state
                        setFile(null)
                        setStatus('idle')
                    }, 1500)
                } catch (err: any) {
                    setError(err.message || 'Failed to parse or upload GPX')
                    setStatus('error')
                }
            }
            reader.readAsText(file)
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred')
            setStatus('error')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl overflow-y-auto">
                <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-white">Upload Activity</h2>
                            <p className="text-slate-400 text-sm">Select your GPX flight log</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {!file ? (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-800 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-4 bg-slate-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <p className="mb-2 text-sm text-slate-300 font-bold">Click or drag GPX file</p>
                                    <p className="text-xs text-slate-500 font-medium">Standard GPX files from Garmin or Strava</p>
                                </div>
                                <input type="file" className="hidden" accept=".gpx" onChange={handleFileChange} />
                            </label>
                        ) : (
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                                        <FileText className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{file.name}</p>
                                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-xs font-bold text-slate-500 hover:text-white transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>

                                {status === 'idle' && (
                                    <button
                                        onClick={handleUpload}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
                                    >
                                        <Upload size={18} />
                                        Upload Flight
                                    </button>
                                )}

                                {(status === 'parsing' || status === 'uploading') && (
                                    <div className="w-full py-4 bg-slate-800 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2">
                                        <Loader2 size={18} className="animate-spin" />
                                        {status === 'parsing' ? 'Analyzing Track...' : 'Uploading to Cloud...'}
                                    </div>
                                )}

                                {status === 'success' && (
                                    <div className="w-full py-4 bg-emerald-500/10 text-emerald-400 font-bold rounded-xl flex items-center justify-center gap-2 border border-emerald-500/20">
                                        <CheckCircle2 size={18} />
                                        Flight Logged!
                                    </div>
                                )}
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm font-medium">
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-800">
                        <div className="flex items-start gap-4 text-slate-500">
                            <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                                <Loader2 size={16} className="text-slate-400" />
                            </div>
                            <p className="text-[11px] leading-relaxed">
                                We process your track log on-device to extract altitude, speed, and distance data.
                                Your original file is safely stored for your own backup.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
