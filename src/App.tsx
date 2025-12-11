import { useState, useRef, FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import imgFrame2 from "./assets/fotoprincipal.jpeg";
import imgFrame3 from "./assets/fotoiglesia.jpeg";

const GOOGLE_MAPS_ADDRESS = "P.º de la Virgen del Puerto, 4, Centro, 28013 Madrid";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GOOGLE_MAPS_ADDRESS)}`;
const WHATSAPP_URL_SANTI = "https://wa.me/34662233037";
const WHATSAPP_URL_ELENA = "https://wa.me/34619593934";
const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"; // Reemplazar con tu URL de Apps Script


function AnimatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div ref={ref} className="box-border content-stretch flex flex-col h-[100vh] items-center justify-between overflow-clip pb-0 pt-0 px-0 relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute bg-[rgba(242,221,242,0.28)] inset-0"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0.28, 0.6]) }}
        />
        <motion.img 
          alt="" 
          className="absolute max-w-none object-50%-50% object-cover size-full" 
          src={imgFrame2}
          style={{ scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]) }}
        />
      </div>
      <div className="bg-[#f5eff5] relative shrink-0 w-full z-10">
        <div className="flex flex-row items-center size-full">
          {/* Desktop Menu */}
          <div className="hidden md:flex box-border content-stretch flex-wrap items-center justify-between gap-3 lg:gap-5 px-[60px] lg:px-[100px] xl:px-[140px] py-[16px] relative w-full">
            <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0">
              <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[24px] lg:text-[28px] text-black text-center">S&E</p>
            </div>
            <div 
              className="flex content-stretch flex-col gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => scrollToSection("ceremonia")}
            >
              <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[15px] lg:text-[16px] text-black text-center">La ceremonia</p>
            </div>
            <div 
              className="flex content-stretch flex-col gap-[4px] items-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => scrollToSection("rsvp")}
            >
              <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[15px] lg:text-[16px] text-black text-center">Confirma tu asistencia</p>
            </div>
            <div className="flex gap-2 items-center">
              <a 
                href={WHATSAPP_URL_SANTI}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#452746] box-border content-stretch flex flex-row gap-[6px] items-center justify-center overflow-clip px-[20px] lg:px-[24px] py-[8px] lg:py-[10px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#5a3358] transition-colors"
                title="Mensaje a Santi"
              >
                <MessageCircle size={16} className="text-neutral-100" />
                <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] lg:text-[14px] text-neutral-100 text-center">Santi</p>
              </a>
              <a 
                href={WHATSAPP_URL_ELENA}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#452746] box-border content-stretch flex flex-row gap-[6px] items-center justify-center overflow-clip px-[20px] lg:px-[24px] py-[8px] lg:py-[10px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#5a3358] transition-colors"
                title="Mensaje a Elena"
              >
                <MessageCircle size={16} className="text-neutral-100" />
                <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] lg:text-[14px] text-neutral-100 text-center">Elena</p>
              </a>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-between px-[20px] py-[14px] relative w-full">
            <div className="content-stretch flex flex-col gap-[4px] items-center relative">
              <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[22px] text-black text-center">S&E</p>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#452746] hover:bg-[#452746]/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-[#f5eff5] border-t border-[#452746]/10 z-50"
            >
              <div className="flex flex-col gap-3 px-[20px] py-[16px]">
                <div 
                  className="flex content-stretch flex-col gap-[4px] items-center relative py-2 cursor-pointer"
                  onClick={() => scrollToSection("ceremonia")}
                >
                  <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[16px] text-black text-center">La ceremonia</p>
                </div>
                <div 
                  className="flex content-stretch flex-col gap-[4px] items-center relative py-2 cursor-pointer"
                  onClick={() => scrollToSection("rsvp")}
                >
                  <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[16px] text-black text-center">Confirma tu asistencia</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a 
                    href={WHATSAPP_URL_SANTI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#452746] box-border content-stretch flex flex-row gap-[8px] items-center justify-center overflow-clip px-[32px] py-[10px] relative rounded-[4px] cursor-pointer hover:bg-[#5a3358] transition-colors"
                  >
                    <MessageCircle size={18} className="text-neutral-100" />
                    <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-100 text-center">Mensaje a Santi</p>
                  </a>
                  <a 
                    href={WHATSAPP_URL_ELENA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#452746] box-border content-stretch flex flex-row gap-[8px] items-center justify-center overflow-clip px-[32px] py-[10px] relative rounded-[4px] cursor-pointer hover:bg-[#5a3358] transition-colors"
                  >
                    <MessageCircle size={18} className="text-neutral-100" />
                    <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-100 text-center">Mensaje a Elena</p>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div 
        className="basis-0 content-stretch flex flex-col font-['Roboto_Slab',serif] font-light gap-[12px] grow items-center justify-center leading-[normal] min-h-px min-w-px relative shrink-0 text-[28px] md:text-[40px] lg:text-[48px] px-4 z-[5]"
        style={{ opacity, scale }}
      >
        <motion.p 
          className="relative shrink-0 text-[#faf7fa] text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >Santiago & Elena</motion.p>
        <motion.p 
          className="relative shrink-0 text-neutral-100 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >12-04-2025</motion.p>
      </motion.div>
    </div>
  );
}

function CeremonySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  const handleNavigate = () => {
    window.open(GOOGLE_MAPS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="ceremonia"
      ref={ref} 
      className="box-border content-stretch flex flex-col gap-[60px] md:gap-[120px] min-h-[100vh] items-center overflow-clip pb-[40px] md:pb-[20px] pt-[40px] md:pt-[60px] px-0 relative shrink-0 w-full"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
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
          <div className="box-border content-stretch flex flex-col gap-[24px] items-center justify-center px-[30px] md:px-[60px] lg:px-[120px] xl:px-[180px] py-[60px] md:py-[160px] relative w-full">
            <motion.div 
              className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full"
              style={{ y: titleY, opacity: titleOpacity }}
            >
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full">
                  <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[18px] md:text-[24px] lg:text-[28px] text-black text-center px-4">{`Os queremos invitar a `}</p>
                </div>
                <p className="font-['Roboto_Slab',serif] font-light italic leading-[normal] relative shrink-0 text-[#452746] text-[48px] md:text-[70px] lg:text-[90px] text-center px-4">La ceremonia</p>
              </div>
            </motion.div>
            <motion.div 
              className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[15px] md:text-[18px] lg:text-[20px] text-black text-center px-4">
                <p className="mb-0">que tendrá lugar en la Ermita de Virgen del Puerto.</p>
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">P.º de la Virgen del Puerto, 4, Centro, 28013 Madrid.</p>
              </div>
            </motion.div>
            <motion.button
              onClick={handleNavigate}
              className="bg-[#452746] box-border content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip px-[32px] md:px-[48px] py-[10px] md:py-[12px] relative rounded-[4px] shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "#5a3358" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] text-neutral-100 text-center whitespace-nowrap">Navegar hasta allí</p>
            </motion.button>
          </div>
        </div>
      </div>
      <motion.div 
        className="h-[350px] md:h-[550px] overflow-clip relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[calc(100%-40px)] md:w-[calc(100%-120px)] lg:w-[calc(100%-240px)] z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(GOOGLE_MAPS_ADDRESS)}&zoom=15`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-[12px]"
        />
      </motion.div>
      <motion.button
        onClick={handleNavigate}
        className="bg-[#452746] box-border content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip px-[32px] py-[10px] md:py-[12px] relative rounded-[4px] shrink-0 z-10 cursor-pointer"
        whileHover={{ scale: 1.05, backgroundColor: "#5a3358" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] text-neutral-100 text-center whitespace-nowrap">Navega hasta allí</p>
      </motion.button>
    </div>
  );
}

function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    celiac: false,
    vegetarian: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          celiac: formData.celiac,
          vegetarian: formData.vegetarian,
          timestamp: new Date().toISOString(),
        }),
      });

      // Con mode: "no-cors", no podemos leer la respuesta, pero asumimos que fue exitoso
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast.success("¡Gracias por confirmar tu asistencia!");
      
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        ref={ref}
        id="rsvp"
        className="relative shrink-0 w-full mt-[60px] md:mt-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center justify-end size-full">
          <div className="box-border content-stretch flex flex-col gap-[24px] items-center justify-end px-[30px] md:px-[60px] lg:px-[120px] py-[100px] md:py-[200px] relative w-full">
            <motion.div 
              className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[24px] md:text-[32px] lg:text-[38px] text-black text-center px-4">Gracias por confirmar tu asistencia</p>
            </motion.div>
            <motion.div 
              className="content-stretch flex flex-col items-center relative shrink-0 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-['Roboto_Slab',serif] font-light italic leading-[normal] relative shrink-0 text-[#452746] text-[60px] md:text-[90px] lg:text-[120px] text-center px-4">¡Te esperamos!</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={ref} id="rsvp" className="relative shrink-0 w-full mt-[60px] md:mt-[120px]" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] md:gap-[32px] items-center justify-end px-[30px] md:px-[60px] lg:px-[120px] xl:px-[180px] py-[100px] md:py-[200px] relative w-full">
          <motion.div 
            className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
              <p className="font-['Roboto_Slab',serif] font-light italic leading-[normal] relative shrink-0 text-[#452746] text-[60px] md:text-[90px] lg:text-[120px] text-center px-4">¿Vendrás?</p>
              <div className="content-stretch flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full">
                <p className="font-['Roboto_Slab',serif] font-light leading-[normal] relative shrink-0 text-[16px] md:text-[18px] lg:text-[20px] text-black text-center w-full px-4">
                  <span>{`Déjanos aquí tus preferencias `}</span>
                  <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">para que todo vaya de lujo.</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white content-stretch flex flex-col gap-[24px] items-start justify-center overflow-clip p-[24px] md:p-[36px] lg:p-[48px] relative rounded-[12px] shadow-lg shrink-0 w-full max-w-[700px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-[12px] w-full">
              <motion.div 
                className="bg-neutral-50 relative rounded-[6px] shrink-0 w-full"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(69, 39, 70, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="box-border content-stretch flex gap-[8px] items-center px-[14px] md:px-[16px] py-[10px] md:py-[12px] relative w-full bg-transparent border-none outline-none font-['Roboto_Slab',serif] font-light leading-[normal] not-italic text-[15px] md:text-[16px] lg:text-[17px] text-black placeholder:text-black/50"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="bg-neutral-50 relative rounded-[6px] shrink-0 w-full"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(69, 39, 70, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <input
                    type="email"
                    placeholder="Tu mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="box-border content-stretch flex gap-[8px] items-center px-[14px] md:px-[16px] py-[10px] md:py-[12px] relative w-full bg-transparent border-none outline-none font-['Roboto_Slab',serif] font-light leading-[normal] not-italic text-[15px] md:text-[16px] lg:text-[17px] text-black placeholder:text-black/50"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="bg-neutral-50 relative rounded-[6px] shrink-0 w-full"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(69, 39, 70, 0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="box-border content-stretch flex gap-[8px] items-center px-[14px] md:px-[16px] py-[10px] md:py-[12px] relative w-full bg-transparent border-none outline-none font-['Roboto_Slab',serif] font-light leading-[normal] not-italic text-[15px] md:text-[16px] lg:text-[17px] text-black placeholder:text-black/50"
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-[12px] w-full">
              <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[12px] relative rounded-[6px] shrink-0">
                <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] lg:text-[17px] text-black">
                  <span>{`Marca la casilla `}</span>
                  <span className="[text-underline-position:from-font] decoration-solid underline">con tus preferencias</span>
                </p>
              </div>
              <motion.div 
                className="content-stretch flex gap-[12px] items-center relative shrink-0 cursor-pointer"
                onClick={() => setFormData({ ...formData, celiac: !formData.celiac })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="relative rounded-[4px] shrink-0 size-[22px] md:size-[24px]"
                  animate={{ backgroundColor: formData.celiac ? "#452746" : "#f5f5f5" }}
                  transition={{ duration: 0.3 }}
                >
                  <div aria-hidden="true" className="absolute border-3 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[5px]" />
                </motion.div>
                <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-[12px] md:px-[14px] py-[8px] md:py-[10px] relative rounded-[6px] shrink-0">
                  <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] lg:text-[17px] text-black whitespace-nowrap">Dieta Celiaca</p>
                </div>
              </motion.div>
              <motion.div 
                className="content-stretch flex gap-[12px] items-center relative shrink-0 cursor-pointer"
                onClick={() => setFormData({ ...formData, vegetarian: !formData.vegetarian })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="relative rounded-[4px] shrink-0 size-[22px] md:size-[24px]"
                  animate={{ backgroundColor: formData.vegetarian ? "#452746" : "#f5f5f5" }}
                  transition={{ duration: 0.3 }}
                >
                  <div aria-hidden="true" className="absolute border-3 border-neutral-50 border-solid inset-[-2px] pointer-events-none rounded-[5px]" />
                </motion.div>
                <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-[12px] md:px-[14px] py-[8px] md:py-[10px] relative rounded-[6px] shrink-0">
                  <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] lg:text-[17px] text-black whitespace-nowrap">Dieta Vegetariana</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#452746] relative rounded-[4px] shrink-0 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02, backgroundColor: isSubmitting ? "#452746" : "#5a3358" }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center px-[32px] py-[10px] md:py-[12px] relative w-full">
                  <p className="font-['Inter',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[15px] md:text-[16px] text-neutral-100 text-nowrap whitespace-pre">
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <motion.div 
      className="bg-[#fcfcfc] box-border content-stretch flex items-center justify-center px-[30px] md:px-[60px] py-[20px] relative shrink-0 w-full mt-[40px] md:mt-[80px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0">
        <p className="font-['Roboto_Slab',serif] font-light leading-[normal] not-italic relative shrink-0 text-[24px] md:text-[28px] text-black text-center">S&E 2025</p>
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
