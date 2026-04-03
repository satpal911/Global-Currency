import { ArrowUpDown, RefreshCw } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "5a9212a24b9360a35161430f";

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
        );
        if (res.data && res.data.conversion_rates) {
          setCurrencyList(Object.keys(res.data.conversion_rates));
        }
      } catch (error) {
        console.error("Failed to load currencies", error);
      }
    };
    fetchCodes();
  }, []);

  const handleConvert = async () => {
    if (!amount || amount <= 0) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`,
      );
      const rate = res.data.conversion_rates[toCurrency];
      setResult(
        (amount * rate).toLocaleString(undefined, { minimumFractionDigits: 2 }),
      );
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-green-600 p-8 text-white text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Global Currency
          </h1>
          <p className="text-green-100 mt-2 opacity-90">
            Real-time exchange rates
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none hover:border-green-400 transition-colors cursor-pointer appearance-none"
              >
                {currencyList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={swap}
              className="mt-6 p-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all transform active:rotate-180"
            >
              <ArrowUpDown size={20} />
            </button>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none hover:border-green-400 transition-colors cursor-pointer appearance-none"
              >
                {currencyList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {result && (
            <div className="mt-4 p-6 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in zoom-in duration-300">
              <p className="text-sm text-green-600 font-semibold mb-1">
                Converted Amount
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-green-800">
                  {result}
                </span>
                <span className="text-lg font-bold text-green-600">
                  {toCurrency}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-bold py-5 rounded-2xl shadow-lg shadow-green-200 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <RefreshCw className="animate-spin" size={24} />
            ) : (
              "Convert Currency"
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Data provided by ExchangeRate-API • Updated Real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Converter;
