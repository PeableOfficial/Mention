"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/app/LocaleContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip } from "@/components/elements/tooltip";
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Button } from "@/components/elements/button";
import { Header } from "@/features/header";
import { toast } from "sonner";

export const FeedbackClientPage = () => {
  const { t } = useLocale();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the feedback to the server
      await axios.post("/api/feedback", { feedback });
      // Reset the feedback input
      setFeedback("");
      // Show a success message
      toast("Feedback submitted successfully");
    } catch (error) {
      // Handle any errors
      console.error("Error submitting feedback:", error);
      // Show an error message
      toast("Failed to submit feedback");
    }
  };

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  return (
    <div>
      <Header>
        <Tooltip text="Back">
          <Button
            onClick={() => {
              router.back();
            }}
            aria-label="Back"
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            <BackArrowIcon />
          </Button>
        </Tooltip>
        <h2>Feedback</h2>
      </Header>
      <div className="container mx-auto px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How can we improve?</AccordionTrigger>
            <AccordionContent>
              We appreciate your feedback! Please let us know how we can improve
              Mention.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Any bugs or issues?</AccordionTrigger>
            <AccordionContent>
              If you encounter any bugs or issues, please provide detailed
              information so that we can investigate and fix them.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Feature requests</AccordionTrigger>
            <AccordionContent>
              Have any feature requests? Let us know what new features you would
              like to see in Mention.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="mb-2 block">
            Feedback:
            <textarea
              value={feedback}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2"
              rows={4}
            />
          </label>
          <Button type="submit" className="bg-primary-100 text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
