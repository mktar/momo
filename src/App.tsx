import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { Database, ShieldCheck, Cloud, Cpu, ArrowUpRight, Activity } from 'lucide-react'

export default function App() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [dbError, setDbError] = useState<string | null>(null)
  const [latency, setLatency] = useState<number | null>(null)

  useEffect(() => {
    async function checkConnection() {
      const start = Date.now()
      try {
        // Query health / session / public introspection
        const { error } = await supabase.auth.getSession()
        const end = Date.now()
        setLatency(end - start)
        if (error) {
          setDbStatus('error')
          setDbError(error.message)
        } else {
          setDbStatus('connected')
        }
      } catch (err: unknown) {
        setDbStatus('error')
        setDbError(err instanceof Error ? err.message : 'Unknown connection error')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20 text-xl">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Momo Platform
            </h1>
            <p className="text-xs text-slate-400">Cloudflare Pages & Local Supabase</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 border border-slate-800">
            <span
              className={`w-2 h-2 rounded-full ${
                dbStatus === 'connected'
                  ? 'bg-emerald-400 animate-pulse'
                  : dbStatus === 'checking'
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-rose-500'
              }`}
            />
            {dbStatus === 'connected' && `متصل (${latency}ms)`}
            {dbStatus === 'checking' && 'جاري الفحص...'}
            {dbStatus === 'error' && 'فشل الاتصال'}
          </span>
        </div>
      </header>

      {/* Main Hero & Architecture Cards */}
      <main className="max-w-5xl mx-auto w-full my-auto py-12 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            المشروع جاهز ومربوط بالسيرفر المحلي
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            نظام متكامل بين السحابة وسيرفرك المحلي
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            الواجهة الأمامية تعمل بسرعة فائقة وموزعة عالمياً عبر{' '}
            <strong className="text-slate-200">Cloudflare Pages</strong>، ومتصلة مباشرة بقاعدة بيانات{' '}
            <strong className="text-emerald-400">Supabase</strong> على سيرفرك المنزلي المشفر عبر النفق الآمن.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Cloudflare Pages */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Cloudflare Pages</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              استضافة سحابية فائقة السرعة للفرونت إند مع ميزة النشر التلقائي مع كل push في GitHub.
            </p>
          </div>

          {/* Card 2: Supabase Backend */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Supabase v3.0 Backend</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              PostgreSQL 17.11، مصادقة Auth، وتخزين Storage يعمل محلياً بكامل الخصوصية والتحكم.
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 font-mono">api.mktar.tk</div>
          </div>

          {/* Card 3: Cloudflare Tunnel */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Secure Tunnel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ربط مباشر مشفر دون الحاجة لفتح منافذ في الراوتر أو IP ثابت.
            </p>
            <div className="pt-2 text-[11px] text-sky-400 font-mono">Zero Trust Argo Tunnel</div>
          </div>
        </div>

        {/* Quick Links & Status */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium">لوحة تحكم السيرفر (Studio Dashboard)</div>
              <div className="text-xs text-slate-400">إدارة الجداول، الصلاحيات وقاعدة البيانات مباشرة</div>
            </div>
          </div>

          <a
            href="https://studio.mktar.tk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
          >
            فتح Supabase Studio
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {dbError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-mono">
            {dbError}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full py-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div>مشروع momo © {new Date().getFullYear()} - جميع الحقوق محفوظة</div>
        <div className="font-mono text-[11px]">Ubuntu 24.04 • Supabase 3.0 • Cloudflare Pages</div>
      </footer>
    </div>
  )
}
