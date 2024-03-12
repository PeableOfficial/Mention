import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Header } from "@/features/header";

const ProPage = () => {
  return (
    <div>
      <Header>
        <HamburgerButton />
        <h1>Mention Pro</h1>
      </Header>
      <Accordion type="single" collapsible className="w-full px-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProPage;

export const metadata = {
  title: "Mention Pro",
};
