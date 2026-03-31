import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Menu, X, Star, Wifi, Coffee, Utensils, Wind, MessageCircle, Send, Tv, Bath, Users, BedDouble } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// --- Constants & Data ---
const HOTEL_NAME = "OCEAN HARMONY HOTEL QUY NHƠN";

const ROOMS = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: '600,000 - 900,000 VND',
    beds: '1 Giường đôi',
    capacity: '2 Người lớn',
    features: ['TV', 'Ban công', 'Wifi miễn phí', 'Phòng tắm riêng'],
    images: [
      '/imgs/standard_room/z7676698728384_011ed2be08fc06e23405b916093df7db.jpg',
      '/imgs/standard_room/z7676991117962_3964c8a37c62266edc24838bc3ece36c.jpg'
    ]
  },
  {
    id: 'family',
    name: 'Family Room',
    price: '1,200,000 - 1,800,000 VND',
    beds: '2 Giường đôi',
    capacity: '4 Người lớn',
    features: ['Bếp nhỏ', 'Sofa', 'TV', 'Ban công', 'Wifi miễn phí'],
    images: [
      '/imgs/family_room/z7676705625095_d8fc0e191d2173ee9530c3e5efc14347.jpg',
      '/imgs/family_room/z7676705654166_c827516155b699e89b6879e2078734c4.jpg'
    ]
  },
  {
    id: 'vip',
    name: 'VIP / Suite Room',
    price: '2,000,000 - 3,500,000 VND',
    beds: '1 Giường King',
    capacity: '2 Người lớn',
    features: ['Bếp cao cấp', 'Sofa', 'TV thông minh', 'Ban công lớn view biển', 'Bồn tắm sục'],
    images: [
      '/imgs/vip_room/z7676708924766_e660dd3d3a3ea7f7c7ac5c92d849c3cd.jpg',
      '/imgs/vip_room/z7676708933262_568cc5138e811f6dfe718050c2ccfae1.jpg',
      
    ]
  }
];

const AMENITIES = [
  {
    id: 'buffet',
    name: 'Nhà hàng Buffet Sáng',
    desc: 'Thưởng thức ẩm thực đa dạng với các món ăn địa phương và quốc tế trong không gian sang trọng.',
    image: '/imgs/others/z7676713499286_7b09aec406fc2542d06ecf84dea7c3e3.jpg'
  },
  {
    id: 'rooftop',
    name: 'Rooftop Bar',
    desc: 'Ngắm nhìn toàn cảnh biển Quy Nhơn về đêm cùng những ly cocktail tuyệt hảo.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kids',
    name: 'Khu Vui Chơi Trẻ Em',
    desc: 'Không gian an toàn và vui nhộn dành riêng cho các bé với nhiều trò chơi hấp dẫn.',
    image: '/imgs/others/z7676713487136_ccd5abcd219b997cbfa95bdceee38f6d.jpg'
  },
  {
    id: 'spa',
    name: 'Spa & Thư Giãn',
    desc: 'Tái tạo năng lượng với các liệu trình massage chuyên nghiệp và không gian yên tĩnh.',
    image: ['/imgs/others/z7676713495832_d2d16bed1da1d4ed67134082503dd349.jpg',
            '/imgs/others/z7676940911048_a6bb246e87c78362e3723ae9e4d3a1d3.jpg'
          ]
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" className={`font-serif text-xl md:text-2xl font-semibold tracking-wider ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              {HOTEL_NAME}
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Trang chủ', 'Giới thiệu', 'Phòng', 'Tiện ích', 'Liên hệ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm uppercase tracking-widest font-medium hover:text-blue-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
                {item}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isScrolled ? 'text-gray-900' : 'text-white'}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Trang chủ', 'Giới thiệu', 'Phòng', 'Tiện ích', 'Liên hệ'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="trang-chủ" className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80" 
          alt="Ocean Harmony Hotel Cover" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Hidden Logo Background Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-10 pointer-events-none mix-blend-overlay">
          <span className="font-serif text-[15vw] font-bold text-white whitespace-nowrap tracking-tighter">OCEAN HARMONY</span>
        </div>
      </motion.div>
      
      <div className="relative z-20 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />)}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-wide drop-shadow-lg">
            {HOTEL_NAME}
          </h1>
          <p className="text-lg md:text-2xl font-light tracking-wider max-w-2xl mx-auto drop-shadow-md">
            Bản giao hưởng của biển cả và sự sang trọng
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Introduction = () => {
  return (
    <section id="giới-thiệu" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">Chào mừng đến với thiên đường nghỉ dưỡng</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tọa lạc tại vị trí đắc địa trên bãi biển Quy Nhơn xinh đẹp, Ocean Harmony Hotel mang đến trải nghiệm nghỉ dưỡng đẳng cấp 4 sao. Với thiết kế tinh tế hòa quyện cùng thiên nhiên, chúng tôi cam kết mang lại cho quý khách những giây phút thư giãn tuyệt đối.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hãy để tiếng sóng biển rì rào và dịch vụ tận tâm của chúng tôi làm nên kỳ nghỉ khó quên của bạn.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              {/* Using a high quality image as a placeholder for the video */}
              <video  
                src="/imgs/video_overview/7676735076521.mp4"
                className="w-full h-full object-cover group-hover:opacity-100"
                autoPlay
                muted
                loop
                controls
                playsInline
              />
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition-colors">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Rooms = () => {
  return (
    <section id="phòng" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Hệ Thống Phòng Nghỉ</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="space-y-24">
          {ROOMS.map((room, index) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {room.images.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`${room.name} view ${i + 1}`} 
                      className={`rounded-xl object-cover shadow-lg ${i === 0 && room.images.length === 3 ? 'col-span-2 h-64 w-full' : 'h-48 w-full'}`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <p className="text-2xl text-blue-600 font-semibold mb-6">{room.price} <span className="text-sm text-gray-500 font-normal">/ đêm</span></p>
                
                <div className="grid grid-cols-2 gap-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <BedDouble className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{room.capacity}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Tiện nghi phòng</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="px-8 py-3 bg-gray-900 text-white rounded-none hover:bg-blue-600 transition-colors uppercase tracking-wider text-sm font-medium">
                  Đặt phòng ngay
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Amenities = () => {
  return (
    <section id="tiện-ích" className="py-24 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Tiện Ích Đẳng Cấp</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-32">
          {AMENITIES.map((amenity, index) => (
            <motion.div 
              key={amenity.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden"
                  >
                    {/* <img 
                      src={amenity.image} 
                      alt={amenity.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    /> */}
                    <div className="w-full md:w-1/2">
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="rounded-2xl overflow-hidden"
  >
    {Array.isArray(amenity.image) ? (
      <div className="grid grid-cols-2 gap-4">
        {amenity.image.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${amenity.name} ${i}`}
            className="w-full h-48 object-cover rounded-xl"
          />
        ))}
      </div>
    ) : (
      <img
        src={amenity.image}
        alt={amenity.name}
        className="w-full h-full object-cover"
      />
    )}
  </motion.div>
</div>
                  </motion.div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <motion.h3 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-serif text-3xl font-bold"
                  >
                    {amenity.name}
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-gray-400 text-lg leading-relaxed"
                  >
                    {amenity.desc}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="liên-hệ" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-8">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-gray-600 mb-10">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ để có kỳ nghỉ hoàn hảo nhất.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Địa chỉ</h4>
                  <p className="text-gray-600 mt-1">172 An Dương Vương, Quy Nhon Beach</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Hotline</h4>
                  <p className="text-gray-600 mt-1">090 123 4567<br/>090 765 4321</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">oceanharmonyhotelqn@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Facebook size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Fanpage</h4>
                  <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">facebook.com/oceanharmonyquynhon</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Gửi tin nhắn</h3>
            <form className="space-y-4">
              <div>
                <input type="text" placeholder="Họ và tên" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <textarea rows={4} placeholder="Nội dung tin nhắn" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"></textarea>
              </div>
              <button type="button" className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Gửi Yêu Cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-8 text-center border-t border-gray-800">
    <p>&copy; {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.</p>
  </footer>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý ảo của Ocean Harmony Hotel. Tôi có thể giúp gì cho quý khách?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Format history for the model
      const formattedContents = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n') + `\nUser: ${userMsg}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: formattedContents,
        config: {
          systemInstruction: `Bạn là nhân viên lễ tân ảo của khách sạn OCEAN HARMONY HOTEL QUY NHƠN. 
          Địa chỉ: 172 An Dương Vương, Quy Nhon Beach.
          Các loại phòng: Standard (600k-900k), Family (1.2tr-1.8tr), VIP/Suite (2tr-3.5tr).
          Tiện ích: Buffet sáng, Rooftop Bar, Khu trẻ em, Spa.
          Hotline: 090 123 4567 / 090 765 4321. Email: booking@oceanharmony.com.
          Hãy trả lời khách hàng lịch sự, nhiệt tình, ngắn gọn bằng tiếng Việt.`,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Xin lỗi, tôi không thể trả lời lúc này.' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, đã có lỗi xảy ra khi kết nối. Vui lòng thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-gray-100"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Lễ tân ảo</h3>
                <p className="text-xs text-gray-300">Ocean Harmony Hotel</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center bg-gray-50 rounded-full border border-gray-200 px-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..." 
                  className="flex-1 bg-transparent py-2 px-3 outline-none text-sm"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="p-2 text-blue-600 disabled:text-gray-400"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />
      <Hero />
      <Introduction />
      <Rooms />
      <Amenities />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

