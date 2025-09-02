import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const developers = [
  {
    name: "Haard",
    github: "https://github.com/haard18",
    twitter: "https://twitter.com/haard18",
    insta: "https://instagram.com/haard18",
    color: "bg-pink-400",
  },
  {
    name: "Dev Patil",
    github: "https://github.com/DevPatils",
    twitter: "https://twitter.com/devpatil",
    insta: "https://instagram.com/devpatil",
    color: "bg-blue-400",
  },
];

export default function Developers() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      className="mt-20 text-center max-w-5xl"
    >
      <h2 className="text-4xl font-black mb-10 px-6 py-3 border-4 border-black bg-white shadow-[6px_6px_0px_black] inline-block rounded-lg">
        Developed By
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {developers.map((dev) => (
          <motion.div
            key={dev.name}
            className={`relative w-28 h-28 flex items-center justify-center rounded-lg font-bold text-white shadow-[6px_6px_0px_black] ${dev.color}`}
          >
            {dev.name}

            {/* Social Links */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, pointerEvents: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black flex items-center justify-center rounded-full text-white hover:bg-gray-800"
              >
                <FaGithub size={14} />
              </a>
              <a
                href={dev.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black flex items-center justify-center rounded-full text-white hover:bg-gray-800"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href={dev.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black flex items-center justify-center rounded-full text-white hover:bg-gray-800"
              >
                <FaInstagram size={14} />
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
