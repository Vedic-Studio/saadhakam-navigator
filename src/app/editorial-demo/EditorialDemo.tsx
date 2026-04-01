"use client";

import {
  AdaptiveReadingPanel,
  LayoutBlock,
} from "@/components/editorial/AdaptiveReadingPanel";
import { InteractiveVerseBlock } from "@/components/editorial/InteractiveVerseBlock";
import { AnchoredMarginalia } from "@/components/editorial/AnchoredMarginalia";

export function EditorialDemo() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2C2A29] py-16 px-4">
      <AdaptiveReadingPanel className="editorial-prose max-w-[65ch] mx-auto">
        <LayoutBlock as="header" className="mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#C15C3D] mb-4">
            Ancient Wisdom
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-[#2C2A29] mb-6">
            The Art of Actionless Action
          </h1>
          <p className="text-xl text-[#2C2A29]/65 leading-relaxed">
            In the second chapter of the Bhagavad Gita, Krishna introduces a
            concept that has puzzled and inspired seekers for millennia: the idea
            that one can act without attachment to results.
          </p>
        </LayoutBlock>

        <LayoutBlock className="space-y-6 mb-10">
          <p className="text-lg leading-[1.8] text-[#2C2A29]/85">
            The battlefield of Kurukshetra is not merely a historical location.
            It is the inner landscape where every human being confronts the
            tension between{" "}
            <AnchoredMarginalia
              panel={
                <span>
                  <strong>धर्म (dharma)</strong> — Righteous duty; the cosmic
                  order that sustains existence. Not &ldquo;religion&rdquo; but
                  the intrinsic nature of a thing.
                </span>
              }
            >
              dharma
            </AnchoredMarginalia>{" "}
            and desire. Arjuna&apos;s crisis is not unique to him — it is the
            universal moment of paralysis before consequential action.
          </p>

          <p className="text-lg leading-[1.8] text-[#2C2A29]/85">
            What Krishna offers is not a philosophy of withdrawal. It is
            something far more radical: a way of being fully engaged in the
            world while remaining inwardly free from its pull. This is the
            essence of{" "}
            <AnchoredMarginalia
              panel={
                <span>
                  <strong>निष्काम कर्म (niṣkāma karma)</strong> — Action
                  performed without desire for personal reward. The practice of
                  doing what must be done simply because it is right.
                </span>
              }
            >
              niṣkāma karma
            </AnchoredMarginalia>
            .
          </p>
        </LayoutBlock>

        <InteractiveVerseBlock
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
          transliteration="karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||"
          translation="You have a right to action alone, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction."
          commentary="This verse does not counsel indifference. It counsels a radical reorientation of motivation — from outcome to process, from reward to responsibility."
          source="Bhagavad Gita 2.47"
          sourceHref="/texts/bhagavad-gita/chapter-2/shloka-47"
        />

        <LayoutBlock className="space-y-6 mt-10">
          <p className="text-lg leading-[1.8] text-[#2C2A29]/85">
            The teaching here is precise. Krishna does not say &ldquo;do not
            act.&rdquo; He does not say &ldquo;do not care.&rdquo; He says: act
            fully, care deeply, but release the tyranny of results. The fruit
            will come or it will not. Your domain is the action itself.
          </p>
        </LayoutBlock>

        <InteractiveVerseBlock
          sanskrit="योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥"
          transliteration="yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya | siddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||"
          translation="Steadfast in yoga, perform actions abandoning attachment, O Dhananjaya. Remaining equal in success and failure — this equanimity is called yoga."
          source="Bhagavad Gita 2.48"
        />

        <LayoutBlock className="space-y-6 mt-10 mb-10">
          <p className="text-lg leading-[1.8] text-[#2C2A29]/85">
            The word{" "}
            <AnchoredMarginalia
              panel={
                <span>
                  <strong>समत्व (samatva)</strong> — Equanimity; evenness of
                  mind. From <em>sama</em> (equal). The capacity to remain
                  undisturbed by the dualities of pleasure and pain, gain and
                  loss.
                </span>
              }
            >
              samatva
            </AnchoredMarginalia>{" "}
            is key. It is not apathy — it is the hard-won capacity to remain
            centred while the world moves around you. This is what separates a
            practitioner from a philosopher.
          </p>
        </LayoutBlock>
      </AdaptiveReadingPanel>
    </div>
  );
}
