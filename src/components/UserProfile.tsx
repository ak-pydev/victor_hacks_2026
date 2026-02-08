import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { IconLogout, IconUser } from "@tabler/icons-react";

interface UserProfileProps {
    profile: any;
    onSignOut: () => void;
}

export function UserProfile({ profile, onSignOut }: UserProfileProps) {
    const [isOpen, setIsOpen] = useState(false);

    const initials = profile?.first_name && profile?.last_name
        ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
        : <IconUser size={20} />;

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-viking-leather border-2 border-viking-gold flex items-center justify-center text-viking-gold font-heading font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-shadow z-50 relative"
            >
                {initials}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-48 bg-viking-charcoal border border-viking-gold/50 rounded-md shadow-xl overflow-hidden z-40"
                    >
                        <div className="p-4 border-b border-viking-maroon/30">
                            <p className="text-white font-bold truncate">{profile?.first_name} {profile?.last_name}</p>
                            <p className="text-xs text-gray-400 truncate">{profile?.email}</p>
                        </div>
                        <button
                            onClick={onSignOut}
                            className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-gray-300 hover:bg-viking-crimson/20 hover:text-white transition-colors"
                        >
                            <IconLogout size={16} />
                            Sign Out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close on click outside */}
            {isOpen && (
                <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}
