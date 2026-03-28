const STEPS = [
  { number: "01", text: "Explore the collection" },
  { number: "02", text: "Select your pieces" },
  { number: "03", text: "Submit your preorder request" },
  { number: "04", text: "We'll contact you directly" },
];

const HowItWorks = () => {
  return (
    <section className="section-padding max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 text-center">
        How it works
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {STEPS.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <span className="text-xs tracking-[0.3em] text-muted-foreground/50 font-medium mt-0.5">
              {step.number}
            </span>
            <p className="text-sm tracking-[0.15em] uppercase text-foreground">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
