import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface InterstitialProps {
  headline: string;
  body: string;
  onContinue: () => void;
}

export const Interstitial = ({ headline, body, onContinue }: InterstitialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
        <CardContent className="p-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-600/10 mb-6">
            <Sparkles className="w-7 h-7 text-orange-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            {headline}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            {body}
          </p>
          <Button
            onClick={onContinue}
            size="lg"
            className="h-12 px-8 rounded-full bg-orange-600 hover:bg-orange-700 gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
