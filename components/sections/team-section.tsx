import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion"
import { AnimatedTooltip } from "../ui/animated-tooltip";

// Team data - easily expandable
const teamMembers = [
  {
    id: 1,
    name: "Adil Zghaoui",
    designation: "CEO & Founder",
    image: "/team/adil.jpeg",
  },
  {
    id: 2,
    name: "Idrissi Dina",
    designation: "chargée de recrutement et superviseuse RH",
    image: "/team/dina.jpeg",
  },
 
  {
    id: 3,
    name: "Ibtissam Omadi",
    designation: "Responsable Administrative",
    image: "/team/ibtissam.jpeg",
  },
 
  
]

const TeamSection = () => {
	return (
		<section className="py-20 bg-white dark:bg-black" id="team">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-2 mb-4">
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Meet the Innovators</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our diverse team of experts is passionate about connecting talent with opportunity. Get to know the people
              behind JobOP.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-row items-center justify-center mb-12 w-full"
          >
            <AnimatedTooltip items={teamMembers} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Want to join our amazing team?</p>
            <Button
              variant="outline"
              size="lg"
              className="group border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

	);
}

export default TeamSection;