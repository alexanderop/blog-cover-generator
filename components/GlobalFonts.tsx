'use client';

import { Inter, Roboto, Poppins, Playfair_Display, Montserrat, Open_Sans, Lato, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const firaCode = Fira_Code({ subsets: ['latin'] });

export function GlobalFonts() {
  return (
    <style jsx global>{`
      :root {
        --font-inter: ${inter.style.fontFamily};
        --font-roboto: ${roboto.style.fontFamily};
        --font-poppins: ${poppins.style.fontFamily};
        --font-playfair-display: ${playfairDisplay.style.fontFamily};
        --font-montserrat: ${montserrat.style.fontFamily};
        --font-open-sans: ${openSans.style.fontFamily};
        --font-lato: ${lato.style.fontFamily};
        --font-fira-code: ${firaCode.style.fontFamily};
      }
    `}</style>
  );
}
