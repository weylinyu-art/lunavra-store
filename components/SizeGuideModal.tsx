"use client";

import { useLocale } from "@/contexts/LocaleContext";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const { t } = useLocale();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 id="size-guide-title" className="font-heading text-xl font-medium text-foreground">
            {t.sizeGuide.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
            aria-label={t.sizeGuide.close}
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm">
          <div>
            <h3 className="font-medium text-foreground">{t.sizeGuide.general}</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full border-collapse text-foreground/80">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="py-2 text-start font-medium">Size</th>
                    <th className="py-2 text-start font-medium">Bust</th>
                    <th className="py-2 text-start font-medium">Waist</th>
                    <th className="py-2 text-start font-medium">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-foreground/10"><td className="py-2">XS</td><td>31-32"</td><td>24-25"</td><td>34-35"</td></tr>
                  <tr className="border-b border-foreground/10"><td className="py-2">S</td><td>33-34"</td><td>26-27"</td><td>36-37"</td></tr>
                  <tr className="border-b border-foreground/10"><td className="py-2">M</td><td>35-36"</td><td>28-29"</td><td>38-39"</td></tr>
                  <tr className="border-b border-foreground/10"><td className="py-2">L</td><td>37-39"</td><td>30-32"</td><td>40-42"</td></tr>
                  <tr><td className="py-2">XL</td><td>40-42"</td><td>33-35"</td><td>43-45"</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground">{t.sizeGuide.braSizes}</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full border-collapse text-foreground/80">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="py-2 text-start font-medium">Band</th>
                    <th className="py-2 text-start font-medium">A</th>
                    <th className="py-2 text-start font-medium">B</th>
                    <th className="py-2 text-start font-medium">C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-foreground/10"><td className="py-2">32</td><td>32-33"</td><td>33-34"</td><td>34-35"</td></tr>
                  <tr className="border-b border-foreground/10"><td className="py-2">34</td><td>34-35"</td><td>35-36"</td><td>36-37"</td></tr>
                  <tr className="border-b border-foreground/10"><td className="py-2">36</td><td>36-37"</td><td>37-38"</td><td>38-39"</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-foreground/60">{t.sizeGuide.note}</p>
        </div>
      </div>
    </div>
  );
}
