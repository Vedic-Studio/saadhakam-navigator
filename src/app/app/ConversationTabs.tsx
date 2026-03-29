"use client";

import { Sparkles, MessageSquare } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Message {
  role: "user" | "ai";
  text: string;
  citations?: string[];
}

interface Conversation {
  id: string;
  label: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "maya",
    label: "Shankara on Maya",
    messages: [
      {
        role: "user",
        text: "What did Shankara mean by maya? Is it just illusion?",
      },
      {
        role: "ai",
        text: 'Shankara defines maya not as "illusion" in the popular sense but as misidentification. In Vivekachudamani (verse 20), he describes it as beginningless, indescribable, and neither real nor unreal. Maya is the power that makes the finite self appear separate from Brahman.',
        citations: ["Vivekachudamani v.20"],
      },
      {
        role: "ai",
        text: "Ramanuja rejects this entirely. In his Sri Bhashya commentary on Brahma Sutras, he argues the world is genuinely real as the body of God. For Ramanuja, maya is not cosmic deception but God\u2019s creative power (prakriti).",
        citations: ["Sri Bhashya on Brahma Sutras"],
      },
      {
        role: "ai",
        text: "The practical difference matters: for Shankara, recognizing maya dissolves attachment through jnana (knowledge). For Ramanuja, the world\u2019s reality is precisely what makes bhakti (devotion) meaningful. Two frameworks, each internally consistent, each producing distinct contemplative traditions.",
      },
    ],
  },
  {
    id: "yoga",
    label: "Yoga Darshana vs Modern Yoga",
    messages: [
      {
        role: "user",
        text: "How is classical Yoga Darshana different from what we call yoga today?",
      },
      {
        role: "ai",
        text: 'Patanjali\u2019s Yoga Sutras (1.2) defines yoga as "yogash chitta vritti nirodhah" \u2014 the cessation of the fluctuations of the mind. The entire system aims at stilling consciousness, not physical flexibility.',
        citations: ["Yoga Sutras 1.2"],
      },
      {
        role: "ai",
        text: "Patanjali\u2019s ashtanga (eight-limbed) path places asana as the third limb, after yama (ethical restraints) and niyama (personal disciplines). The physical postures are preparation for dharana (concentration), dhyana (meditation), and samadhi (absorption). Modern postural yoga inverts this hierarchy.",
        citations: ["Yoga Sutras 2.29"],
      },
      {
        role: "ai",
        text: "Hatha Yoga, which emerged centuries later through texts like the Hatha Yoga Pradipika (15th century), expanded the physical dimension significantly. Most studio yoga today descends from this Hatha tradition filtered through 20th-century teachers like Krishnamacharya, not directly from Patanjali.",
        citations: ["Hatha Yoga Pradipika"],
      },
    ],
  },
  {
    id: "logos",
    label: "Stoic Logos vs Brahman",
    messages: [
      {
        role: "user",
        text: "How does the Stoic concept of logos compare to Brahman?",
      },
      {
        role: "ai",
        text: 'Marcus Aurelius in Meditations (IV.40) describes logos as the rational principle pervading all things \u2014 the ordering intelligence of the cosmos. The Mandukya Upanishad (verse 2) calls Brahman "sarvam hyetad brahma" \u2014 all this is indeed Brahman.',
        citations: ["Meditations IV.40", "Mandukya Upanishad v.2"],
      },
      {
        role: "ai",
        text: "The structural parallel is real: both posit a single principle underlying all phenomena. But the epistemological paths diverge. The Stoics reach logos through rational observation of nature. The Upanishadic rishis reach Brahman through direct meditative realization (anubhava), which they consider prior to and more fundamental than rational inference.",
      },
      {
        role: "ai",
        text: "There is also an ontological gap. Stoic logos is material \u2014 a kind of refined fire pervading matter. Brahman in Advaita is pure consciousness, neither material nor immaterial in the Western sense. Shankara would say logos describes an effect (vyavaharika), not the ultimate cause (paramarthika).",
        citations: ["Brahma Sutra Bhashya 1.1.2"],
      },
    ],
  },
  {
    id: "practice",
    label: "Starting a Daily Practice",
    messages: [
      {
        role: "user",
        text: "I want to start a daily spiritual practice but I don\u2019t know which path suits me.",
      },
      {
        role: "ai",
        text: 'Krishna addresses this across the Bhagavad Gita (3.3, 12.8\u201312). He describes different temperaments suited to different paths: jnana yoga for the contemplative mind, karma yoga for the active temperament, bhakti yoga for the devotional heart, and dhyana yoga for the meditative disposition.',
        citations: ["Bhagavad Gita 3.3", "Bhagavad Gita 12.8-12"],
      },
      {
        role: "ai",
        text: "A few questions to start: Do you find yourself drawn more to intellectual inquiry (understanding the nature of things), to devotional expression (prayer, chanting, relationship with the divine), to selfless action (service without attachment to results), or to silent meditation?",
      },
      {
        role: "user",
        text: "Probably intellectual inquiry and silent meditation.",
      },
      {
        role: "ai",
        text: "That combination points toward jnana yoga with a dhyana foundation. A practical starting point: 15 minutes of seated meditation (following Patanjali\u2019s Yoga Sutras 1.12 on abhyasa \u2014 steady practice), followed by contemplation on a passage from the Upanishads or the Gita. The Isha Upanishad (18 verses) or Gita Chapter 2 are strong starting texts.",
        citations: ["Yoga Sutras 1.12", "Isha Upanishad"],
      },
    ],
  },
];

function ChatMessage({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-indigo-500/15 border border-indigo-500/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
          <p className="text-sm text-foreground">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-5 py-4 max-w-[90%] space-y-3">
        <p className="text-sm text-foreground/90 leading-relaxed">
          {message.text}
        </p>
        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.citations.map((cite) => (
              <span
                key={cite}
                className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {cite}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConversationTabs() {
  return (
    <Tabs defaultValue="maya" className="w-full">
      <TabsList className="w-full flex bg-white/5 border border-white/10 rounded-xl p-1 mb-6 h-auto flex-wrap gap-1">
        {conversations.map((conv) => (
          <TabsTrigger
            key={conv.id}
            value={conv.id}
            className="flex-1 min-w-[140px] rounded-lg px-3 py-2.5 text-xs md:text-sm font-medium text-muted-foreground data-[state=active]:bg-indigo-500/15 data-[state=active]:text-indigo-300 data-[state=active]:border-indigo-500/20 data-[state=active]:border data-[state=active]:shadow-none transition-colors"
          >
            {conv.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {conversations.map((conv) => (
        <TabsContent key={conv.id} value={conv.id}>
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">
                    Sadhaka AI
                  </span>
                  <span className="block text-[11px] text-indigo-400 uppercase tracking-wider">
                    Preview
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                AI Tutor Coming Soon
              </span>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-5">
              {conv.messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}
            </div>

            {/* Input mockup */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/5 rounded-full py-2.5 px-4 text-sm text-muted-foreground/50 border border-white/5">
                  Ask about any verse, concept, or practice...
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600/50 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-indigo-200/50" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
