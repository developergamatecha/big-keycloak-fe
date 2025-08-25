import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { clsx } from 'keycloakify/tools/clsx';
import ImageHomepage from '../../assets/img/homepage.png';
import ImageOrganization from '../../assets/img/organization.png';
import { useDotButton } from '../../hooks/use-dot-button';
import { DotButton } from './carousel-dot';

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 5000,
      }),
    ],
  );

  const { onDotButtonClick, scrollSnaps, selectedIndex } =
    useDotButton(emblaApi);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className="flex-[0_0_100%]">
            <div className="flex flex-col items-center space-y-6">
              <div className="max-w-lg space-y-4 text-center select-none">
                <h2 className="text-2xl font-bold leading-tight lg:text-3xl">
                  Portal Sistem Informasi Baharkam
                </h2>
                <p className="text-base leading-relaxed lg:text-lg text-white/90">
                  Akses mudah ke platform terintegrasi untuk mengelola
                  aktivitas, berita, dan informasi penting di lingkungan
                  Baharkam Polri.
                </p>
              </div>
              <div className="relative w-full max-w-xl px-4">
                <div className="p-3 border-b bg-white/15 backdrop-blur-sm rounded-t-xl border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/70"></div>
                    </div>
                    <div className="flex-1 px-3 py-1 ml-4 rounded-md bg-white/10">
                      <span className="text-xs text-white/70">
                        baharkam.polri.go.id
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-white shadow-2xl rounded-b-xl">
                  <img
                    src={ImageHomepage}
                    alt="Homepage"
                    className="w-full h-auto select-none"
                  />

                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-primary/10 to-transparent hover:opacity-100"></div>

                  <div className="absolute px-3 py-1 text-xs font-medium text-white rounded-full select-none top-4 right-4 bg-primary/90 backdrop-blur-sm">
                    Live Preview
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-primary/5 to-white/5 rounded-3xl blur-2xl -z-10"></div>

                <div className="absolute top-0 left-0 w-24 h-24 translate-x-12 -translate-y-8 rounded-full bg-white/10 blur-xl"></div>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_100%]">
            <div className="flex flex-col items-center space-y-6">
              <div className="max-w-lg space-y-4 text-center select-none">
                <h2 className="text-2xl font-bold leading-tight lg:text-3xl">
                  Pengelolaan Personil yang Efisien
                </h2>
                <p className="text-base leading-relaxed lg:text-lg text-white/90">
                  Manajemen Laporan yang Terstruktur
                </p>
                <p className="text-sm leading-relaxed lg:text-base text-white/80">
                  Susun, unggah, dan pantau laporan kegiatan dengan cepat dan
                  sistematis.
                </p>
              </div>

              <div className="relative w-full max-w-xl px-4">
                <div className="relative p-6 shadow-2xl bg-white/10 backdrop-blur-sm rounded-2xl">
                  <img
                    src={ImageOrganization}
                    alt="Struktur Organisasi"
                    className="w-full h-auto rounded-lg"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl"></div>

                  <div className="absolute px-3 py-1 text-xs font-medium text-white rounded-full top-4 right-4 bg-primary/90 backdrop-blur-sm">
                    Struktur Organisasi
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-primary/5 to-white/5 rounded-3xl blur-2xl -z-10"></div>

                <div className="absolute top-0 left-0 w-24 h-24 translate-x-12 -translate-y-8 rounded-full bg-white/10 blur-xl"></div>
              </div>
            </div>
          </div>
          {/* <div className="flex-[0_0_100%]">Slide 2</div> */}
        </div>
      </div>

      <div>
        <div className="flex justify-center mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={clsx(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === selectedIndex ? 'bg-white' : 'bg-white/40',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
