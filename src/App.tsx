import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Menu, X } from "lucide-react";
import imgFrame2 from "figma:asset/ba2569d1aa3effa6179d2bd463c121f6c7928d4f.png";
import imgMapMakerSilver from "figma:asset/a88fcf0c665b88fe04f6f097fe8eb5b563d79e51.png";
import imgFrame3 from "figma:asset/06f492bf9cf2e2abba2d5b4ae86aff3572851f51.png";

function AnimatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0.8],
  );

  return (
    <div
      ref={ref}
      className="box-border content-stretch flex flex-col min-h-[600px] md:h-[1080px] items-center justify-between overflow-clip pb-[24px] pt-0 px-0 relative shrink-0 w-full"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          className="absolute bg-[rgba(242,221,242,0.28)] inset-0"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.3],
              [0.28, 0.6],
            ),
          }}
        />
        <motion.img
          alt=""
          className="absolute max-w-none object-50%-50% object-cover size-full"
          src={imgFrame2}
          style={{
            scale: useTransform(
              scrollYProgress,
              [0, 0.5],
              [1, 1.1],
            ),
          }}
        />
      </div>
      <div className="bg-[#f5eff5] relative shrink-0 w-full z-10">
        <div className="flex flex-row items-center size-full">
          {/* Desktop Menu */}
          <div className="hidden md:flex box-border content-stretch flex-wrap items-center justify-between gap-4 lg:gap-8 px-[80px] lg:px-[120px] xl:px-[160px] py-[20px] relative w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
              <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] lg:text-[36px] text-black text-center">{`~S & L~`}</p>
            </div>
            <div className="flex content-stretch flex-col gap-[6.4px] items-center relative shrink-0">
              <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[18px] lg:text-[20px] text-black text-center">
                La ceremonia
              </p>
            </div>
            <div className="flex content-stretch flex-col gap-[6.4px] items-center relative shrink-0">
              <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[18px] lg:text-[20px] text-black text-center">
                Confirma tu asistencia
              </p>
            </div>
            <div className="bg-[#452746] box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[32px] lg:px-[40px] py-[10px] lg:py-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#5a3358] transition-colors">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[16px] lg:text-[18px] text-neutral-100 text-center">
                Contacta con los novios
              </p>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-between px-[20px] py-[16px] relative w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-center relative">
              <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[28px] text-black text-center">{`~S & L~`}</p>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#452746] hover:bg-[#452746]/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:hidden overflow-hidden bg-[#f5eff5] border-t border-[#452746]/10"
            >
              <div className="flex flex-col gap-4 px-[20px] py-[20px]">
                <div className="flex content-stretch flex-col gap-[6.4px] items-center relative py-3">
                  <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[20px] text-black text-center">
                    La ceremonia
                  </p>
                </div>
                <div className="flex content-stretch flex-col gap-[6.4px] items-center relative py-3">
                  <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[20px] text-black text-center">
                    Confirma tu asistencia
                  </p>
                </div>
                <div className="bg-[#452746] box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[40px] py-[12px] relative rounded-[4px] cursor-pointer hover:bg-[#5a3358] transition-colors">
                  <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-neutral-100 text-center">
                    Contacta con los novios
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="basis-0 content-stretch flex flex-col font-['Migra_Italic:Extralight_Italic',sans-serif] gap-[16px] grow italic items-center justify-center leading-[normal] min-h-px min-w-px relative shrink-0 text-[32px] md:text-[50px] lg:text-[60px] px-4 z-10"
        style={{ opacity, scale }}
      >
        <motion.p
          className="relative shrink-0 text-[#faf7fa] text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >{`~Santiago & Laura~`}</motion.p>
        <motion.p
          className="relative shrink-0 text-neutral-100 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          12-07-2025
        </motion.p>
      </motion.div>
    </div>
  );
}

function CeremonySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100, 0, -100],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 1.05],
  );

  return (
    <div
      ref={ref}
      className="box-border content-stretch flex flex-col gap-[120px] md:gap-[240px] min-h-[1000px] md:h-[1893px] items-center overflow-clip pb-[80px] md:pb-[24px] pt-[120px] md:pt-0 px-0 relative shrink-0 w-full mt-[80px] md:mt-[160px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <motion.img
          alt=""
          className="absolute max-w-none object-50%-50% object-cover size-full opacity-40"
          src={imgFrame3}
          style={{ scale: imageScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>
      <div className="bg-gradient-to-b from-[#f5f5f5] relative shrink-0 to-[rgba(245,245,245,0)] w-full z-10">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[40px] items-center justify-center px-[40px] md:px-[80px] lg:px-[160px] xl:px-[240px] py-[120px] md:py-[320px] relative w-full">
            <motion.div
              className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full"
              style={{ y: titleY, opacity: titleOpacity }}
            >
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
                  <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[24px] md:text-[36px] lg:text-[42px] text-black text-center px-4">{`Os queremos invtar a `}</p>
                </div>
                <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[#452746] text-[60px] md:text-[90px] lg:text-[120px] text-center px-4">
                  La ceremonia
                </p>
              </div>
            </motion.div>
            <motion.div
              className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[18px] md:text-[22px] lg:text-[26px] text-black text-center px-4">
                <p className="mb-0">
                  que tendrá lugar en la Ermita de Virgen del
                  Puerto.
                </p>
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">
                  Paseo de la Virgen del Puerto 32. Madrid
                  28005.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-[#452746] box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[40px] md:px-[60px] py-[12px] md:py-[14px] relative rounded-[4px] shrink-0 cursor-pointer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#5a3358",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] text-neutral-100 text-center whitespace-nowrap">
                Navegar hasta allí
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className="h-[400px] md:h-[693px] overflow-clip relative rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[calc(100%-40px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-320px)] z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute bg-white content-stretch flex gap-[80px] items-start left-0 overflow-clip rounded-[16px] top-0">
          <div
            className="relative shrink-0 size-[1919px]"
            data-name="🌎 Map Maker:  (Silver)"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
              src={imgMapMakerSilver}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="bg-[#452746] box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[40px] py-[12px] md:py-[14px] relative rounded-[4px] shrink-0 z-10 cursor-pointer"
        whileHover={{ scale: 1.05, backgroundColor: "#5a3358" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] text-neutral-100 text-center whitespace-nowrap">
          Navega hasta allí
        </p>
      </motion.div>
    </div>
  );
}

function RSVPForm() {
  const [hasGuest, setHasGuest] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    celiac: false,
    vegetarian: false,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guestCeliac: false,
    guestVegetarian: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [100, 0],
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1],
  );

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        ref={ref}
        className="relative shrink-0 w-full mt-[120px] md:mt-[240px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center justify-end size-full">
          <div className="box-border content-stretch flex flex-col gap-[40px] items-center justify-end px-[40px] md:px-[80px] lg:px-[160px] py-[200px] md:py-[400px] relative w-full">
            <motion.div
              className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[32px] md:text-[42px] lg:text-[52px] text-black text-center px-4">
                Gracias por confirmar tu asistencia
              </p>
            </motion.div>
            <motion.div
              className="content-stretch flex flex-col items-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[#452746] text-[80px] md:text-[120px] lg:text-[160px] text-center px-4">
                ¡Te esperamos!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-full mt-[120px] md:mt-[240px]"
    >
      <div className="flex flex-col items-center justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] md:gap-[60px] items-center justify-end px-[40px] md:px-[80px] lg:px-[160px] xl:px-[240px] py-[200px] md:py-[400px] relative w-full">
          <motion.div
            className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
              <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[#452746] text-[80px] md:text-[120px] lg:text-[160px] text-center px-4">
                ¿Vendrás?
              </p>
              <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full">
                <p className="font-['Migra_Italic:Extralight_Italic',sans-serif] italic leading-[normal] relative shrink-0 text-[20px] md:text-[24px] lg:text-[28px] text-black text-center w-full px-4">
                  <span>{`Déjanos aquí tus preferencias `}</span>
                  <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">
                    para que todo vaya de lujo.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white content-stretch flex flex-col gap-[40px] items-start justify-center overflow-clip relative rounded-[16px] shrink-0 w-full max-w-[1200px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="box-border content-stretch flex flex-col md:flex-row gap-[40px] md:gap-[60px] lg:gap-[80px] items-start pb-0 pt-[40px] px-[30px] md:px-[50px] lg:px-[70px] relative shrink-0 w-full">
              <div className="flex flex-col items-start self-stretch w-full md:w-auto md:flex-1">
                <div className="box-border content-stretch flex flex-col gap-[16px] h-full items-start px-0 py-[16px] relative shrink-0 w-full md:w-[320px] lg:w-[360px]">
                  <motion.div
                    className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow:
                        "0 0 0 2px rgba(69, 39, 70, 0.2)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow:
                        "0 0 0 2px rgba(69, 39, 70, 0.2)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <input
                        type="email"
                        placeholder="Tu mail"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow:
                        "0 0 0 2px rgba(69, 39, 70, 0.2)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <input
                        type="tel"
                        placeholder="Tu teléfono"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col items-start self-stretch w-full md:w-auto">
                <div className="content-stretch flex flex-col gap-[16px] h-full items-start justify-end relative shrink-0 w-full">
                  <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-0 py-[16px] relative rounded-[8px] shrink-0">
                    <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black">
                      <span>{`Marca la casilla `}</span>
                      <span className="[text-underline-position:from-font] decoration-solid underline">
                        con tus preferencias
                      </span>
                    </p>
                  </div>
                  <motion.div
                    className="content-stretch flex gap-[16px] items-center relative shrink-0 cursor-pointer"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        celiac: !formData.celiac,
                      })
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative rounded-[4px] shrink-0 size-[26px] md:size-[30px]"
                      animate={{
                        backgroundColor: formData.celiac
                          ? "#452746"
                          : "#f5f5f5",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-4 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[6px]"
                      />
                    </motion.div>
                    <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative rounded-[8px] shrink-0">
                      <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black whitespace-nowrap">
                        Dieta Celiaca
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="content-stretch flex gap-[16px] items-center relative shrink-0 cursor-pointer"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        vegetarian: !formData.vegetarian,
                      })
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative rounded-[4px] shrink-0 size-[26px] md:size-[30px]"
                      animate={{
                        backgroundColor: formData.vegetarian
                          ? "#452746"
                          : "#f5f5f5",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-4 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[6px]"
                      />
                    </motion.div>
                    <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative rounded-[8px] shrink-0">
                      <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black whitespace-nowrap">
                        Dieta Vegetariana
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <motion.div
                className="relative shrink-0 w-full cursor-pointer"
                animate={{
                  backgroundColor: hasGuest
                    ? "#ffffff"
                    : "rgba(245, 245, 245, 0.28)",
                  borderColor: hasGuest
                    ? "#452746"
                    : "transparent",
                }}
                style={{
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  borderWidth: hasGuest ? "4px 4px 0px" : "0px",
                  borderStyle: "solid",
                }}
                onClick={() => setHasGuest(!hasGuest)}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[16px] items-center px-[30px] md:px-[50px] lg:px-[70px] py-[24px] md:py-[32px] relative w-full">
                    <motion.div
                      className="relative rounded-[4px] shrink-0 size-[26px] md:size-[30px]"
                      animate={{
                        backgroundColor: hasGuest
                          ? "#452746"
                          : "#f5f5f5",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border-4 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[6px]"
                      />
                    </motion.div>
                    <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative rounded-[8px] shrink-0">
                      <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black">
                        Marca esta casilla si traerás algún
                        invitado
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{
                  height: hasGuest ? "auto" : 0,
                  opacity: hasGuest ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden w-full"
              >
                <div
                  className="bg-white relative shrink-0 w-full"
                  style={{
                    borderLeft: "4px solid #452746",
                    borderRight: "4px solid #452746",
                    borderBottom: "4px solid #000000",
                  }}
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex flex-col md:flex-row gap-[40px] md:gap-[60px] lg:gap-[80px] items-start pb-[40px] pt-0 px-[30px] md:px-[50px] lg:px-[70px] relative w-full">
                      <div className="flex flex-col items-start self-stretch w-full md:w-auto md:flex-1">
                        <div className="box-border content-stretch flex flex-col gap-[16px] h-full items-start px-0 py-[16px] relative shrink-0 w-full md:w-[320px] lg:w-[360px]">
                          <motion.div
                            className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1,
                            }}
                            whileFocus={{
                              scale: 1.02,
                              boxShadow:
                                "0 0 0 2px rgba(69, 39, 70, 0.2)",
                            }}
                          >
                            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                              <input
                                type="text"
                                placeholder="El nombre del invitado/a"
                                value={formData.guestName}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    guestName: e.target.value,
                                  })
                                }
                                className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2,
                            }}
                            whileFocus={{
                              scale: 1.02,
                              boxShadow:
                                "0 0 0 2px rgba(69, 39, 70, 0.2)",
                            }}
                          >
                            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                              <input
                                type="email"
                                placeholder="Su mail"
                                value={formData.guestEmail}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    guestEmail: e.target.value,
                                  })
                                }
                                className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            className="bg-neutral-50 relative rounded-[8px] shrink-0 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3,
                            }}
                            whileFocus={{
                              scale: 1.02,
                              boxShadow:
                                "0 0 0 2px rgba(69, 39, 70, 0.2)",
                            }}
                          >
                            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                              <input
                                type="tel"
                                placeholder="Su teléfono"
                                value={formData.guestPhone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    guestPhone: e.target.value,
                                  })
                                }
                                className="box-border content-stretch flex gap-[10px] items-center px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative w-full bg-transparent border-none outline-none font-['Migra:Extralight',sans-serif] leading-[normal] not-italic text-[18px] md:text-[20px] lg:text-[22px] text-black placeholder:text-black/50"
                              />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start self-stretch w-full md:w-auto">
                        <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-full">
                          <motion.div
                            className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-0 py-[16px] relative rounded-[8px] shrink-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1,
                            }}
                          >
                            <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black">
                              <span>{`Marca la casilla `}</span>
                              <span className="[text-underline-position:from-font] decoration-solid underline">
                                con sus preferencias
                              </span>
                            </p>
                          </motion.div>
                          <motion.div
                            className="content-stretch flex gap-[16px] items-center relative shrink-0 cursor-pointer"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                guestCeliac:
                                  !formData.guestCeliac,
                              })
                            }
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2,
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="relative rounded-[4px] shrink-0 size-[26px] md:size-[30px]"
                              animate={{
                                backgroundColor:
                                  formData.guestCeliac
                                    ? "#452746"
                                    : "#f5f5f5",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                aria-hidden="true"
                                className="absolute border-4 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[6px]"
                              />
                            </motion.div>
                            <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative rounded-[8px] shrink-0">
                              <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black whitespace-nowrap">
                                Dieta Celiaca
                              </p>
                            </div>
                          </motion.div>
                          <motion.div
                            className="content-stretch flex gap-[16px] items-center relative shrink-0 cursor-pointer"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                guestVegetarian:
                                  !formData.guestVegetarian,
                              })
                            }
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3,
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="relative rounded-[4px] shrink-0 size-[26px] md:size-[30px]"
                              animate={{
                                backgroundColor:
                                  formData.guestVegetarian
                                    ? "#452746"
                                    : "#f5f5f5",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                aria-hidden="true"
                                className="absolute border-4 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[6px]"
                              />
                            </motion.div>
                            <div className="box-border content-stretch flex gap-[10px] items-center overflow-clip px-[16px] md:px-[20px] py-[12px] md:py-[14px] relative rounded-[8px] shrink-0">
                              <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] lg:text-[22px] text-black whitespace-nowrap">
                                Dieta Vegetariana
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#452746] relative rounded-[4px] shrink-0 w-full cursor-pointer"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#5a3358",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
              >
                <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[40px] py-[12px] md:py-[14px] relative w-full">
                    <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] md:text-[20px] text-neutral-100 text-nowrap whitespace-pre">
                      Enviar
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <motion.div
      className="bg-[#fcfcfc] box-border content-stretch flex items-center justify-center px-[40px] md:px-[80px] py-[24px] relative shrink-0 w-full mt-[80px] md:mt-[160px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
        <p className="font-['Migra:Extralight',sans-serif] leading-[normal] not-italic relative shrink-0 text-[30px] md:text-[36px] text-black text-center">{`~S & L~ 2026`}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full bg-white">
      <AnimatedHeader />
      <CeremonySection />
      <RSVPForm />
      <Footer />
    </div>
  );
}