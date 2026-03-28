import { useState, useRef } from "react";
import React from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:"#F4F2ED", surface:"#FFFFFF", surface2:"#F9F8F5",
  ink:"#1A1C1E", ink2:"#3D4145", muted:"#7A7E84", dim:"#B0B4B9",
  border:"#E2DFD9", borderMd:"#C8C4BC",
  accent:"#2C5F54", accentLt:"#EAF2F0", accentMd:"#C2D9D5",
  gold:"#9A7B3F", goldLt:"#F5EFE0",
  red:"#C0392B",
};
const CAT = {
  "Weight Loss":"#4A6FA5","Performance":"#2C5F54",
  "Recovery":"#7B5EA7","Longevity":"#9A7B3F","Supplies":"#7A7E84",
};
const R = { card:8, sm:5, xs:3 };
const LAUNCH_PW = "vantagen2025";
const ADMIN_PW  = "vtadmin2025";
const mono  = "'Courier Prime','Courier New',monospace";
const serif = "'Libre Baskerville',Georgia,serif";
const sans  = "'Outfit',system-ui,sans-serif";

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────
// fullDesc: displayed in the modal — accessible but professional
const KITS = [
  {
    id:"k1", name:"Retatrutide", code:"RT10", mg:"10mg × 10 vials",
    supplierPrice:230, sellPrice:289, category:"Weight Loss", badge:"BESTSELLER",
    desc:"Triple GIP/GLP-1/Glucagon agonist. The most advanced metabolic research compound currently available.",
    fullDesc:`Retatrutide is a next-generation synthetic peptide designed to simultaneously engage three distinct hormonal receptor systems: GLP-1 (glucagon-like peptide-1), GIP (glucose-dependent insulinotropic polypeptide), and glucagon receptors. This triple-agonist profile makes it one of the most structurally sophisticated compounds currently studied in metabolic research.

Each of these receptor pathways plays a specific role in how the body processes energy, regulates appetite signalling, and manages fat tissue. By engaging all three at once, Retatrutide allows researchers to study the combined and individual contributions of each pathway in a single experimental model — something that was previously difficult to achieve without multiple compounds.

This material is supplied as a lyophilised (freeze-dried) research-grade peptide, intended strictly for in-vitro and analytical laboratory applications by qualified scientific professionals. It is not approved for human or veterinary use.`,
  },
  {
    id:"k2", name:"Retatrutide 20", code:"RT20", mg:"20mg × 10 vials",
    supplierPrice:410, sellPrice:519, category:"Weight Loss", badge:"HIGH DOSE",
    desc:"High-dose Retatrutide kit for extended metabolic research protocols.",
    fullDesc:`Retatrutide 20 is the high-dose formulation of the triple GIP/GLP-1/Glucagon receptor agonist, supplied at 20mg per vial for research applications that require larger quantities or longer-duration protocols.

Its triple-agonist mechanism engages three interconnected hormonal receptor systems simultaneously, making it particularly relevant to studies exploring the relative contributions of each receptor pathway to metabolic regulation, energy homeostasis, and adipose tissue behaviour.

The higher per-vial concentration reduces reconstitution frequency and is suited to extended or comparative in-vitro studies. Supplied as a lyophilised research-grade substance for use exclusively in regulated laboratory environments by qualified researchers.`,
  },
  {
    id:"k3", name:"Tirzepatide", code:"TR10", mg:"10mg × 10 vials",
    supplierPrice:115, sellPrice:145, category:"Weight Loss", badge:null,
    desc:"Dual GIP/GLP-1 receptor agonist. Extensively studied for metabolic and glycaemic research.",
    fullDesc:`Tirzepatide is a dual-incretin peptide that acts as a simultaneous agonist at two receptor types: GLP-1 (glucagon-like peptide-1) and GIP (glucose-dependent insulinotropic polypeptide). Both are naturally occurring hormones secreted by the gut in response to food intake, and they play complementary roles in insulin regulation and metabolic signalling.

What makes Tirzepatide particularly interesting from a research perspective is how the combined GIP and GLP-1 activation appears to produce effects that differ from activating either receptor alone — a phenomenon known as synergistic receptor crosstalk. This makes it a valuable tool for studying how these two systems interact at a cellular and molecular level.

Supplied as a lyophilised research-grade peptide for in-vitro and laboratory use only. Not intended for human or veterinary application.`,
  },
  {
    id:"k4", name:"Tirzepatide 20", code:"TR20", mg:"20mg × 10 vials",
    supplierPrice:220, sellPrice:279, category:"Weight Loss", badge:null,
    desc:"High-dose Tirzepatide. Comprehensive dual-receptor metabolic pathway research.",
    fullDesc:`Tirzepatide 20 is the high-dose kit formulation of the dual GLP-1 and GIP receptor agonist, providing 20mg per vial for research protocols requiring extended quantities or dose-escalation study designs.

As a dual-incretin compound, Tirzepatide engages the GLP-1 and GIP receptor systems that govern insulin secretion, nutrient sensing, and energy storage pathways. The 20mg format is particularly suited for longitudinal studies, multi-group experimental designs, or comparative assays where consistent compound availability is critical.

Supplied as a lyophilised research-grade substance for qualified laboratory professionals. Intended solely for in-vitro and analytical research applications within regulated environments.`,
  },
  {
    id:"k5", name:"CJC-1295 (no DAC)", code:"CJC", mg:"2mg × 10 vials",
    supplierPrice:110, sellPrice:139, category:"Performance", badge:null,
    desc:"Modified GRF 1-29 GHRH analog. Short-acting, pulsatile GH release without DAC modification.",
    fullDesc:`CJC-1295 without DAC — also referred to as Modified GRF 1-29 — is a synthetic analogue of Growth Hormone Releasing Hormone (GHRH), the natural signal produced by the hypothalamus that prompts the pituitary gland to secrete growth hormone.

The "no DAC" designation indicates the absence of a Drug Affinity Complex modification, which means this version has a shorter duration of action compared to its DAC counterpart. This shorter active window is intentional for certain research designs, as it more closely mimics the natural pulsatile (pulse-like) rhythm in which growth hormone is released by the body under normal physiological conditions.

This compound is widely used in GH axis research, endocrinological studies, and experiments examining how pulsatile hormone release differs from continuous exposure. Supplied as a lyophilised research-grade peptide for laboratory use by qualified professionals only.`,
  },
  {
    id:"k6", name:"TB-500", code:"TB4", mg:"5mg × 10 vials",
    supplierPrice:140, sellPrice:179, category:"Recovery", badge:null,
    desc:"Thymosin Beta-4 fragment. Widely studied for systemic healing and cellular migration.",
    fullDesc:`TB-500 is a synthetic peptide corresponding to the most biologically active region of Thymosin Beta-4 — a naturally occurring protein present in virtually all human and animal cells, where it plays structural and regulatory roles in cellular organisation.

The specific fragment used in TB-500 (amino acids 17–23 of the full Thymosin Beta-4 sequence) is associated with actin regulation — actin being a fundamental protein involved in cell movement, shape, and division. This connection to actin dynamics is what makes TB-500 particularly relevant to researchers studying tissue repair signalling, cellular migration, inflammation modulation, and wound healing pathways at a molecular level.

TB-500 has been studied in a broad range of research contexts and is considered a well-characterised reference compound in regenerative biochemistry. Supplied as a lyophilised research-grade substance for in-vitro and analytical use in regulated laboratory environments only.`,
  },
  {
    id:"k7", name:"BPC-157", code:"BPC157", mg:"5mg × 10 vials",
    supplierPrice:80, sellPrice:99, category:"Recovery", badge:"POPULAR",
    desc:"Body Protective Compound. Among the most extensively researched peptides for gut and tissue repair.",
    fullDesc:`BPC-157, or Body Protective Compound-157, is a synthetic pentadecapeptide — a chain of precisely 15 amino acids — originally derived from a protein naturally present in human gastric secretions. Despite its small size, it has become one of the most extensively researched peptides in the fields of regenerative biochemistry and gastrointestinal physiology.

What makes BPC-157 compelling from a research perspective is the breadth of biological processes it appears to interact with. Studies have examined its involvement in angiogenesis (the formation of new blood vessels), nitric oxide signalling, tendon and ligament biology, gut-brain axis interactions, and cytoprotective mechanisms in the gastrointestinal tract.

Its stability under acidic conditions — unusual for a peptide — has also made it a subject of interest in oral bioavailability research. BPC-157 is available in both a 10-vial kit and as a single vial, making it suitable for both extended research protocols and smaller-scale pilot studies. Supplied as a lyophilised research-grade compound for laboratory use by qualified professionals only.`,
    hasSingle: true,
  },
  {
    id:"k8", name:"DSIP", code:"DSIP", mg:"5mg × 10 vials",
    supplierPrice:90, sellPrice:115, category:"Longevity", badge:null,
    desc:"Delta Sleep-Inducing Peptide. Studied for sleep architecture regulation and stress response.",
    fullDesc:`DSIP — Delta Sleep-Inducing Peptide — is a nonapeptide (nine amino acids) first isolated in the 1970s from the cerebral venous blood of rabbits during slow-wave sleep states. Since its discovery, it has attracted sustained interest in neurochemical and neuroendocrine research.

Its name reflects its original association with the induction of delta-wave brain activity — the slow oscillations characteristic of deep, restorative sleep. Beyond sleep architecture, DSIP has been studied in the context of the hypothalamic-pituitary-adrenal (HPA) axis, stress hormone modulation, and circadian rhythm regulation.

DSIP is considered a structurally unusual peptide due to its apparent resistance to rapid degradation and its ability to cross the blood-brain barrier — both properties that make it a useful tool in neurochemical research. Supplied as a lyophilised research-grade peptide for regulated laboratory use by qualified professionals only.`,
  },
  {
    id:"k9", name:"Selank", code:"SELANK", mg:"5mg × 10 vials",
    supplierPrice:80, sellPrice:99, category:"Longevity", badge:null,
    desc:"Anxiolytic heptapeptide. Studied extensively for cognitive and neurological research applications.",
    fullDesc:`Selank is a synthetic heptapeptide (seven amino acids) developed as a structural analogue of Tuftsin — a naturally occurring immunomodulatory tetrapeptide derived from immunoglobulin G. Through the addition of a stabilising amino acid sequence, Selank exhibits enhanced metabolic stability compared to its parent compound.

It belongs to a class of compounds studied in neurochemical research for their interactions with the GABAergic system — the primary inhibitory signalling network in the brain. Research has also examined Selank in relation to BDNF (Brain-Derived Neurotrophic Factor) expression, serotonin metabolism, and the regulation of anxiety-related neurological pathways.

Selank was originally developed and researched extensively in Russian scientific institutions and has been the subject of numerous peer-reviewed neurobiological studies. This material is supplied as a research-grade compound for use exclusively in qualified laboratory environments, and is not associated with any approved therapeutic application in the EU.`,
  },
  {
    id:"k10", name:"Semax", code:"SEMAX", mg:"10mg × 10 vials",
    supplierPrice:100, sellPrice:129, category:"Longevity", badge:null,
    desc:"Neuropeptide ACTH analog. Studied for cognitive performance and neuroprotective mechanisms.",
    fullDesc:`Semax is a synthetic heptapeptide derived from the 4–10 fragment of adrenocorticotropic hormone (ACTH) — a pituitary hormone involved in the stress response — with modifications that remove its hormonal activity while preserving and enhancing its neurological research properties.

It is primarily studied for its effects on BDNF (Brain-Derived Neurotrophic Factor) — a protein critical to the growth, maintenance, and survival of neurons. Research has also examined Semax in relation to cognitive signalling pathways, neuroprotective mechanisms following ischemic events, and attention-related neurochemical processes.

Like Selank, Semax was developed within Russian academic research institutions and has been documented in a substantial body of peer-reviewed literature. It is supplied here as a lyophilised research-grade peptide for in-vitro and analytical laboratory applications by qualified professionals. Not approved for any therapeutic, cosmetic, or nutritional use.`,
  },
  {
    id:"k11", name:"CJC + Ipamorelin", code:"CJC+IPA", mg:"5mg × 10 vials",
    supplierPrice:190, sellPrice:239, category:"Performance", badge:"STACK KIT",
    desc:"Pre-combined synergistic GH secretagogue kit. Full pulsatile GH release research protocol.",
    fullDesc:`This kit combines two complementary growth hormone secretagogues — CJC-1295 (no DAC) and Ipamorelin — pre-formulated together in each vial, making it a convenient option for research protocols that study both compounds in combination.

CJC-1295 (no DAC) works at the level of the hypothalamus, acting as a GHRH (Growth Hormone Releasing Hormone) analogue to signal the pituitary gland to prepare and release growth hormone. Ipamorelin operates through a different receptor pathway — the ghrelin receptor — to also stimulate GH secretion, but independently of the GHRH axis.

When studied together, these two mechanisms are understood to have a synergistic relationship: activating both pathways simultaneously produces a stronger and more sustained GH secretion pulse than either compound alone. This makes the combination particularly useful for researchers studying GH axis dynamics, secretagogue interactions, or pulsatile hormone release patterns. Pre-combined in each vial for research convenience. Supplied as a lyophilised research-grade substance for laboratory use only.`,
  },
  {
    id:"k12", name:"Ipamorelin", code:"IPA", mg:"5mg × 10 vials",
    supplierPrice:90, sellPrice:115, category:"Performance", badge:null,
    desc:"Selective GHRP with minimal side-effect profile. Clean, well-researched GH secretagogue.",
    fullDesc:`Ipamorelin is a synthetic pentapeptide (five amino acids) classified as a Growth Hormone Releasing Peptide (GHRP). It acts as an agonist at the ghrelin receptor — also known as the GHS-R (Growth Hormone Secretagogue Receptor) — stimulating growth hormone release from the anterior pituitary gland.

What distinguishes Ipamorelin in research settings is its selectivity. Unlike earlier GHRPs such as GHRP-2 or GHRP-6, Ipamorelin produces minimal influence on cortisol, prolactin, or ACTH levels at research-relevant doses. This makes it a cleaner experimental tool when the aim is to study isolated GH axis responses without confounding signals from other endocrine pathways.

Ipamorelin is one of the most frequently cited reference compounds in GH secretagogue research and is available here in both kit format (10 vials) and as a single vial. Supplied as a lyophilised research-grade peptide for use by qualified professionals in regulated laboratory settings only.`,
    hasSingle: true,
  },
  {
    id:"k13", name:"GHRP-6", code:"GHRP6", mg:"5mg × 10 vials",
    supplierPrice:80, sellPrice:99, category:"Performance", badge:null,
    desc:"Growth hormone releasing hexapeptide. Studied for comprehensive GH axis stimulation.",
    fullDesc:`GHRP-6 — Growth Hormone Releasing Peptide-6 — is a synthetic hexapeptide (six amino acids) and one of the earliest GH secretagogues developed for research purposes. It acts as an agonist at the ghrelin receptor, stimulating growth hormone release from the pituitary gland through a mechanism independent of the GHRH pathway.

As one of the original GHRP compounds, GHRP-6 has an extensive research history and serves as a key reference compound in studies examining the ghrelin receptor system. Its broader receptor activity — compared to more selective GHRPs like Ipamorelin — also makes it a useful tool when researchers aim to study the full spectrum of GHS-R mediated effects, including those on appetite signalling, gastric motility, and energy regulation.

GHRP-6 has been documented across a wide range of peer-reviewed neuroendocrine and endocrinological research. Supplied as a lyophilised research-grade peptide for qualified laboratory professionals. Not intended for human or veterinary use.`,
  },
  {
    id:"k14", name:"MOTS-c", code:"MOTSC", mg:"10mg × 10 vials",
    supplierPrice:160, sellPrice:199, category:"Longevity", badge:"LONGEVITY",
    desc:"Mitochondrial-derived peptide. Studied for metabolic regulation and longevity signalling pathways.",
    fullDesc:`MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA type-c) is a small peptide encoded not in the cell's nucleus, but within the mitochondrial genome itself — a discovery that challenged long-held assumptions about what mitochondria produce. It was first characterised in 2015 and has since generated significant research interest in geroscience and metabolic biology.

Mitochondria are the energy-producing structures within cells, and MOTS-c appears to function as a signalling molecule that communicates metabolic status between the mitochondria and the cell nucleus — a process called retrograde signalling. Research has associated MOTS-c with insulin sensitivity regulation, AMPK pathway activation, and adaptive responses to metabolic stress, all of which are processes closely linked to healthy cellular ageing.

Its mitochondrial origin and its apparent capacity to translocate to the nucleus under certain conditions make MOTS-c a structurally and functionally unique research compound. Supplied as a lyophilised research-grade peptide for in-vitro and analytical laboratory use by qualified professionals only.`,
  },
  {
    id:"k15", name:"SS-31", code:"SS31", mg:"10mg × 10 vials",
    supplierPrice:200, sellPrice:249, category:"Longevity", badge:null,
    desc:"Mitochondria-targeting tetrapeptide. Studied for cardioprotection and anti-aging mechanisms.",
    fullDesc:`SS-31 (also known by its research name Elamipretide) is a synthetic tetrapeptide (four amino acids) engineered with a specific alternating aromatic-cationic structure that gives it a strong affinity for the inner mitochondrial membrane — a rare and deliberate design feature.

Its primary research focus relates to cardiolipin — a unique phospholipid found almost exclusively in the inner mitochondrial membrane, where it plays an essential structural and functional role in mitochondrial energy production. With age and under oxidative stress conditions, cardiolipin can become damaged or disorganised, compromising mitochondrial efficiency. SS-31 is studied for its ability to bind and stabilise cardiolipin, with implications for research into mitochondrial dysfunction, cardiac biology, and cellular energy metabolism.

SS-31 is considered a leading research compound in the emerging field of mitochondrial medicine, with a growing body of peer-reviewed literature supporting its use as a research tool. Supplied as a lyophilised research-grade peptide for qualified laboratory use only.`,
  },
];

const SINGLES = [
  {
    id:"s1", name:"BPC-157", mg:"5mg",
    supplierPrice:25, sellPrice:30, category:"Recovery",
    desc:"Single vial BPC-157 for targeted gut and tissue repair research.",
    fullDesc:`BPC-157, or Body Protective Compound-157, is a synthetic pentadecapeptide — a chain of precisely 15 amino acids — originally derived from a protein naturally present in human gastric secretions. Despite its small size, it has become one of the most extensively researched peptides in the fields of regenerative biochemistry and gastrointestinal physiology.

What makes BPC-157 compelling from a research perspective is the breadth of biological processes it appears to interact with. Studies have examined its involvement in angiogenesis (the formation of new blood vessels), nitric oxide signalling, tendon and ligament biology, gut-brain axis interactions, and cytoprotective mechanisms in the gastrointestinal tract.

Its stability under acidic conditions — unusual for a peptide — has also made it a subject of interest in oral bioavailability research. Available as a single vial or in a cost-effective 10-vial kit. Supplied as a lyophilised research-grade compound for laboratory use by qualified professionals only.`,
    kitId:"k7",
  },
  {
    id:"s2", name:"MT-2", mg:"10mg",
    supplierPrice:20, sellPrice:24, category:"Performance",
    desc:"Melanotan II. Studied for melanocortin receptor activity and pigmentation research.",
    fullDesc:`Melanotan II (MT-2) is a synthetic analogue of alpha-melanocyte-stimulating hormone (α-MSH), a naturally occurring peptide hormone that interacts with the melanocortin receptor family — a group of receptors distributed across diverse tissue types including the skin, brain, and adipose tissue.

In research contexts, MT-2 is primarily used to study melanocortin receptor pharmacology — particularly MC1R (associated with pigmentation), MC3R and MC4R (associated with energy regulation and appetite signalling), and MC2R (associated with adrenal function). Its non-selective binding across multiple receptor subtypes makes it a useful tool for comparative receptor studies.

MT-2 has been documented extensively in dermatological, endocrinological, and neuroscience research literature. Supplied as a lyophilised research-grade compound for in-vitro and analytical use by qualified laboratory professionals only. Not approved for any therapeutic or cosmetic application within the EU.`,
  },
  {
    id:"s3", name:"Tesamorelin", mg:"5mg",
    supplierPrice:30, sellPrice:37, category:"Performance",
    desc:"Growth hormone releasing factor analog. Studied for visceral adipose tissue research.",
    fullDesc:`Tesamorelin is a synthetic analogue of Growth Hormone Releasing Hormone (GHRH) — the hypothalamic signal that instructs the pituitary gland to produce and secrete growth hormone. It consists of the full 44-amino acid GHRH sequence with the addition of a trans-3-hexenoic acid group at the N-terminus, a modification that significantly increases the peptide's metabolic stability without altering its receptor binding profile.

In research settings, Tesamorelin is particularly associated with studies on visceral adipose tissue (VAT) — the fat stored around abdominal organs — and its relationship to GH/IGF-1 axis dynamics. Its full-length GHRH sequence makes it structurally distinct from truncated analogues like CJC-1295, offering researchers a different tool for studying GHRH receptor pharmacology and GH secretion kinetics.

Supplied as a lyophilised research-grade peptide for in-vitro and analytical laboratory use only. Not approved for human or veterinary use in the EU outside of specifically authorised clinical contexts.`,
  },
  {
    id:"s4", name:"Ipamorelin", mg:"5mg",
    supplierPrice:15, sellPrice:19, category:"Performance",
    desc:"Single vial Ipamorelin for introductory GH secretagogue research.",
    fullDesc:`Ipamorelin is a synthetic pentapeptide (five amino acids) classified as a Growth Hormone Releasing Peptide (GHRP). It acts as an agonist at the ghrelin receptor — also known as the GHS-R (Growth Hormone Secretagogue Receptor) — stimulating growth hormone release from the anterior pituitary gland.

What distinguishes Ipamorelin in research settings is its selectivity. Unlike earlier GHRPs such as GHRP-2 or GHRP-6, Ipamorelin produces minimal influence on cortisol, prolactin, or ACTH levels at research-relevant doses. This makes it a cleaner experimental tool when the aim is to study isolated GH axis responses without confounding signals from other endocrine pathways.

Available as a single vial for pilot studies or smaller research runs, or in a cost-effective 10-vial kit for extended protocols. Supplied as a lyophilised research-grade peptide for use by qualified professionals in regulated laboratory settings only.`,
    kitId:"k12",
  },
  {
    id:"s5", name:"GHK-Cu", mg:"50mg", image:"/products/ghk-cu.png",
    supplierPrice:25, sellPrice:30, category:"Longevity",
    desc:"Copper peptide complex. Studied for wound healing, skin regeneration and antioxidant properties.",
    fullDesc:`GHK-Cu is a naturally occurring tripeptide — comprising the amino acids Glycine, Histidine, and Lysine — complexed with a copper (II) ion (Cu²⁺). It is found endogenously in human plasma, saliva, and urine, and its concentration declines measurably with age, a fact that has contributed to significant interest in its biological roles.

From a research perspective, GHK-Cu is notable for its interaction with a wide variety of biological processes. Studies have examined its involvement in wound healing signalling, collagen and elastin synthesis, activation of antioxidant defence enzymes (particularly superoxide dismutase), anti-inflammatory gene expression, and more recently, its apparent ability to influence the expression of genes associated with tissue remodelling and cellular rejuvenation.

The copper coordination is essential to its activity — the Cu²⁺ ion is not merely a structural addition but appears to participate directly in several of GHK-Cu's observed biological interactions. Supplied as a lyophilised research-grade compound for in-vitro and analytical laboratory use by qualified professionals only.`,
  },
  {
    id:"s6", name:"GLOW", mg:"70mg",
    supplierPrice:65, sellPrice:79, category:"Longevity",
    desc:"Combined skin-focused peptide blend for regenerative skin research applications.",
    fullDesc:`GLOW is a research-formulated blend of complementary skin-biology peptides, assembled specifically for use in studies examining regenerative, structural, and anti-aging mechanisms within cutaneous tissue models.

Rather than isolating a single signalling pathway, GLOW is designed to engage multiple biological processes relevant to skin health research simultaneously — including collagen and matrix protein regulation, antioxidant signalling, cellular repair pathways, and barrier integrity. Multi-target approaches like this are increasingly used in dermatological research to model the complex, interdependent nature of skin ageing and regeneration.

The specific peptide composition of GLOW has been selected for complementary mechanisms with minimal pathway overlap, making it a practical starting point for researchers designing multi-target in-vitro skin biology experiments. Supplied as a lyophilised research-grade compound for analytical and laboratory use by qualified professionals only.`,
  },
  {
    id:"s7", name:"BAC Water", mg:"10ml",
    supplierPrice:5, sellPrice:7, category:"Supplies",
    desc:"Bacteriostatic water for reconstitution of lyophilised peptides.",
    fullDesc:`Bacteriostatic Water (BAC Water) is sterile water for injection containing 0.9% benzyl alcohol as a preservative. It is used as the standard diluent for reconstituting lyophilised (freeze-dried) peptide compounds prior to use in laboratory research.

The benzyl alcohol content serves an important function: unlike plain sterile water, it inhibits bacterial growth in the reconstituted solution, allowing the preparation to remain stable and usable over a longer period when stored appropriately (typically refrigerated between 2–8°C). This is particularly relevant in research settings where a single vial of reconstituted peptide may be accessed multiple times over days or weeks.

BAC Water is an essential consumable for any laboratory working with lyophilised peptides. Each 10ml vial provides sufficient volume to reconstitute multiple peptide samples. Supplied for laboratory and research use only.`,
  },
];

const TABLETS = [
  {
    id:"t1", name:"SLU-PP-332", mg:"450mcg × 100 pcs",
    supplierPrice:55, sellPrice:69, category:"Performance",
    desc:"ERR agonist compound. Studied for metabolic activity and exercise-mimetic research effects.",
    fullDesc:`SLU-PP-332 is a synthetic small-molecule compound functioning as a pan-agonist of the Estrogen-Related Receptor (ERR) family — specifically ERRα, ERRβ, and ERRγ. Despite the name, these receptors are not directly regulated by oestrogen; rather, they are nuclear receptors that act as master regulators of mitochondrial biogenesis and oxidative metabolism.

ERRα and ERRγ in particular are highly expressed in tissues with high energy demands — heart, skeletal muscle, and brown adipose tissue — where they regulate the transcription of genes involved in fatty acid oxidation, mitochondrial function, and ATP production. SLU-PP-332's ability to activate all three ERR subtypes simultaneously makes it a useful tool for researchers studying metabolic pathway regulation and energy expenditure at a molecular level.

It has attracted particular attention in the emerging field of "exercise mimetics" — compounds that activate the molecular pathways engaged by physical exercise, independent of actual muscular activity. This makes it relevant to research into metabolic syndrome, mitochondrial disease models, and comparative physiology. Supplied as a tablet formulation for research use only; not for human consumption.`,
  },
];

const STACKS = [
  {name:"Glow Protocol",      color:C.gold,           category:"Longevity",    tagline:"Skin & Regeneration",       peptides:["GHK-Cu","BPC-157","DSIP"],            desc:"Targets collagen synthesis, tissue remodelling and sleep-phase regeneration simultaneously."},
  {name:"Forge Protocol",     color:C.accent,         category:"Performance",  tagline:"Performance & GH Axis",     peptides:["CJC + Ipamorelin","GHRP-6","TB-500"],  desc:"Synergistic GH secretion with systemic recovery support. Complete GH axis research protocol."},
  {name:"Lean Protocol",      color:CAT["Weight Loss"],category:"Weight Loss", tagline:"Metabolic Research",        peptides:["Retatrutide","Tirzepatide","BPC-157"],  desc:"Triple and dual receptor agonists combined with gut-repair compound. Comprehensive metabolic research."},
  {name:"Longevity Protocol", color:CAT["Longevity"],  category:"Longevity",   tagline:"Cellular & Mitochondrial",  peptides:["MOTS-c","SS-31","Selank"],              desc:"Mitochondrial peptides with neuroprotective support. Advanced longevity pathway research."},
];

const CATS = ["All","Weight Loss","Performance","Recovery","Longevity","Supplies"];
const METHODS = [
  {id:"revolut",label:"Revolut Pay",            sub:"Instant EU transfer · no fees",       icon:"R", color:C.accent,         note:"Send to @vantagen on Revolut. Include your name in the reference. Confirmed instantly."},
  {id:"bank",   label:"European Bank Transfer",  sub:"SEPA · any EU bank · typically free",  icon:"€", color:CAT["Weight Loss"],note:"IBAN details shown at confirmation. SEPA transfers arrive within 0–1 business days."},
  {id:"crypto", label:"Crypto",                  sub:"Bitcoin (BTC) or USDT (TRC-20)",       icon:"₿", color:C.gold,           note:"Wallet addresses shown at confirmation. Order processed after 1 network confirmation."},
  {id:"card",   label:"Card Payment",            sub:"Visa / Mastercard via Revolut link",   icon:"▣", color:C.accent,         note:"We send a secure Revolut payment link to your email after you place the order."},
  {id:"paypal", label:"PayPal",                  sub:"Friends & Family only",                icon:"P", color:"#003087",        note:"Send as Friends & Family to payments@vantagen.com to avoid transaction fees."},
];

// ─── COMPOUND GLYPHS ─────────────────────────────────────────────────────────
const GLYPHS = {
  "Retatrutide": ({size=100}) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="34" cy="56" r="22" stroke={C.accent} strokeWidth="0.9" opacity="0.45"/>
      <circle cx="66" cy="56" r="22" stroke={C.accent} strokeWidth="0.9" opacity="0.45"/>
      <circle cx="50" cy="30" r="22" stroke={C.accent} strokeWidth="0.9" opacity="0.45"/>
      <circle cx="50" cy="47" r="6" stroke={C.accent} strokeWidth="0.8" opacity="0.6" fill={C.accentLt}/>
      <circle cx="50" cy="47" r="2" fill={C.accent} opacity="0.55"/>
    </svg>
  ),
  "BPC-157": ({size=100}) => {
    const top = [12,24,36,48,60,72,84,88].map((x,i)=>({x,y:36+Math.sin(i*0.9)*4}));
    const bot = [18,30,42,54,66,78,88].map((x,i)=>({x,y:60+Math.sin(i*0.9)*4}));
    const all = [...top,...bot];
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {top.slice(0,-1).map((n,i)=><line key={`t${i}`} x1={n.x} y1={n.y} x2={top[i+1].x} y2={top[i+1].y} stroke={C.accent} strokeWidth="0.8" opacity="0.45"/>)}
        {bot.slice(0,-1).map((n,i)=><line key={`b${i}`} x1={n.x} y1={n.y} x2={bot[i+1].x} y2={bot[i+1].y} stroke={C.accent} strokeWidth="0.8" opacity="0.45"/>)}
        {top.map((n,i)=>i<7&&<line key={`c${i}`} x1={n.x} y1={n.y} x2={bot[i].x} y2={bot[i].y} stroke={C.accent} strokeWidth="0.5" opacity="0.22"/>)}
        {all.map((n,i)=><circle key={i} cx={n.x} cy={n.y} r={i===7?3.5:2} fill={i===7?C.accent:"#fff"} stroke={C.accent} strokeWidth="0.8" opacity={i===7?0.65:0.6}/>)}
      </svg>
    );
  },
  "GHK-Cu": ({size=100}) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,16 80,66 20,66" stroke={C.accent} strokeWidth="0.9" opacity="0.5" fill="none"/>
      <line x1="50" y1="16" x2="50" y2="44" stroke={C.accent} strokeWidth="0.7" strokeDasharray="3,4" opacity="0.32"/>
      <line x1="80" y1="66" x2="58" y2="52" stroke={C.accent} strokeWidth="0.7" strokeDasharray="3,4" opacity="0.32"/>
      <line x1="20" y1="66" x2="42" y2="52" stroke={C.accent} strokeWidth="0.7" strokeDasharray="3,4" opacity="0.32"/>
      <circle cx="50" cy="50" r="10" stroke={C.gold} strokeWidth="0.9" opacity="0.65"/>
      <circle cx="50" cy="50" r="3.5" fill={C.gold} opacity="0.45"/>
      <circle cx="50" cy="16" r="3" fill={C.accent} opacity="0.5"/>
      <circle cx="80" cy="66" r="3" fill={C.accent} opacity="0.5"/>
      <circle cx="20" cy="66" r="3" fill={C.accent} opacity="0.5"/>
    </svg>
  ),
  "MOTS-c": ({size=100}) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="36" stroke={C.accent} strokeWidth="0.7" opacity="0.22"/>
      <circle cx="50" cy="50" r="26" stroke={C.accent} strokeWidth="0.8" opacity="0.38"/>
      <circle cx="50" cy="50" r="16" stroke={C.accent} strokeWidth="0.9" opacity="0.55"/>
      <circle cx="50" cy="50" r="5"  fill={C.accent} opacity="0.38"/>
      {[0,45,90,135,180,225,270,315].map(deg=>{
        const r=36, rad=deg*Math.PI/180;
        return <circle key={deg} cx={50+r*Math.cos(rad)} cy={50+r*Math.sin(rad)} r="2.2" fill={C.accent} opacity="0.42"/>;
      })}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(deg=>{
        const r=26, rad=deg*Math.PI/180;
        return <circle key={`i${deg}`} cx={50+r*Math.cos(rad)} cy={50+r*Math.sin(rad)} r="1.5" fill={C.accent} opacity="0.28"/>;
      })}
    </svg>
  ),
  "CJC + Ipamorelin": ({size=100}) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="37" cy="50" r="22" stroke={C.accent} strokeWidth="0.9" opacity="0.5"/>
      <circle cx="63" cy="50" r="22" stroke={C.accent} strokeWidth="0.9" opacity="0.5"/>
      <path d="M50 30 C56 38 56 62 50 70 C44 62 44 38 50 30 Z" fill={C.accent} opacity="0.07" stroke={C.accent} strokeWidth="0.6" opacity="0.3"/>
      <circle cx="37" cy="50" r="2.5" fill={C.accent} opacity="0.45"/>
      <circle cx="63" cy="50" r="2.5" fill={C.accent} opacity="0.45"/>
      <circle cx="50" cy="50" r="2"   fill={C.accent} opacity="0.7"/>
    </svg>
  ),
};

const FEATURED = [
  { glyphKey:"Retatrutide",       item: null },
  { glyphKey:"BPC-157",           item: null },
  { glyphKey:"GHK-Cu",            item: null },
  { glyphKey:"MOTS-c",            item: null },
  { glyphKey:"CJC + Ipamorelin",  item: null },
];
// items resolved after arrays defined:
FEATURED[0].item = KITS.find(k=>k.id==="k1");
FEATURED[1].item = KITS.find(k=>k.id==="k7");
FEATURED[2].item = SINGLES.find(s=>s.id==="s5");
FEATURED[3].item = KITS.find(k=>k.id==="k14");
FEATURED[4].item = KITS.find(k=>k.id==="k11");

// ─── CONTAINER SCROLL ────────────────────────────────────────────────────────
function ContainerScroll({onOpenModal, cartIds}) {
  const ref = useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.7)));
      const rotateX = 24 - progress * 24;   // 24deg → 0deg
      const scale   = 1.04 - progress * 0.04; // 1.04 → 1.0
      el.style.transform = `perspective(1400px) rotateX(${rotateX}deg) scale(${scale})`;
      el.style.opacity = 0.4 + progress * 0.6;
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{padding:"0 32px 0", background:C.bg, overflow:"hidden"}}>
      <div
        ref={ref}
        style={{
          willChange:"transform, opacity",
          transformOrigin:"top center",
          background:C.surface,
          border:`1px solid ${C.borderMd}`,
          borderRadius:R.card,
          boxShadow:"0 24px 80px rgba(26,28,30,0.13)",
          overflow:"hidden",
        }}
      >
        {/* Header strip */}
        <div style={{padding:"16px 28px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:8,letterSpacing:"0.38em",color:C.muted,fontFamily:mono,textTransform:"uppercase"}}>Featured Compounds</div>
          <div style={{fontSize:8,letterSpacing:"0.2em",color:C.dim,fontFamily:mono,textTransform:"uppercase"}}>Click to explore →</div>
        </div>

        {/* Horizontally scrollable compound row */}
        <div style={{display:"flex",overflowX:"auto",padding:"28px 24px",gap:16,scrollbarWidth:"none"}}>
          {FEATURED.map(({item, glyphKey}) => {
            if (!item) return null;
            const Glyph = GLYPHS[glyphKey];
            const cc = CAT[item.category] || C.accent;
            const inCart = cartIds.includes(item.name);
            return (
              <div
                key={glyphKey}
                onClick={()=>onOpenModal(item)}
                style={{
                  flexShrink:0, width:180,
                  background:C.surface2, border:`1px solid ${C.border}`,
                  borderRadius:R.card, padding:"20px 18px",
                  cursor:"pointer", transition:"all 0.22s",
                  position:"relative",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=C.surface;e.currentTarget.style.borderColor=C.borderMd;e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.surface2;e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="translateY(0)";}}
              >
                {inCart&&<div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:C.accent}}/>}
                <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
                  {Glyph&&<Glyph size={56}/>}
                </div>
                <div style={{fontSize:7,letterSpacing:"0.28em",color:cc,fontFamily:mono,textTransform:"uppercase",marginBottom:5}}>{item.category}</div>
                <div style={{fontFamily:serif,fontSize:14,fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:8}}>{item.name}</div>
                <div style={{fontFamily:serif,fontSize:15,fontWeight:700,color:C.ink}}>€{item.sellPrice}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SCROLL TILT SECTION ─────────────────────────────────────────────────────
function ScrollTiltSection({children}) {
  const ref = useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 when top of section is at bottom of viewport, 1 when top reaches viewport center
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6)));
      const rotateX = 10 - progress * 10;       // 10deg → 0deg
      const opacity  = 0.3 + progress * 0.7;    // 0.3 → 1
      el.style.opacity = opacity;
      el.style.transform = `perspective(1200px) rotateX(${rotateX}deg)`;
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} style={{willChange:"transform, opacity", transformOrigin:"top center"}}>
      {children}
    </div>
  );
}

// ─── SCROLL REVEAL ITEM ──────────────────────────────────────────────────────
function ScrollRevealItem({ children, index = 0 }) {
  const ref = useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s`;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} style={{display:"flex",flexDirection:"column",height:"100%"}}>{children}</div>;
}

// ─── TUBELIGHT NAV ───────────────────────────────────────────────────────────
function TubelightNav({ tab, onTabChange }) {
  const items = [{ id:"kits",label:"Kits" },{ id:"singles",label:"Singles" },{ id:"stacks",label:"Stacks" }];
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [ind, setInd] = React.useState({ left:0, width:0 });
  const [mounted, setMounted] = React.useState(false);
  const updateInd = () => {
    const idx = items.findIndex(i=>i.id===tab);
    const el = itemRefs.current[idx];
    const box = containerRef.current;
    if (!el||!box) return;
    const cr=box.getBoundingClientRect(); const er=el.getBoundingClientRect();
    setInd({ left:er.left-cr.left, width:er.width });
  };
  React.useEffect(()=>{ const t=setTimeout(()=>{setMounted(true);updateInd();},30); return()=>clearTimeout(t); },[]);
  React.useEffect(()=>{ if(mounted) updateInd(); },[tab,mounted]);
  const glowX = ind.left + ind.width/2;
  return (
    <div ref={containerRef} style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.72)", border:`1px solid ${C.border}`, backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", padding:"4px", borderRadius:100, position:"relative", boxShadow:`0 2px 20px rgba(44,95,84,0.10)` }}>
      <div style={{ position:"absolute", top:4, bottom:4, left:ind.left, width:ind.width, background:C.accentLt, border:`1px solid ${C.accentMd}`, borderRadius:100, transition:mounted?"left 0.44s cubic-bezier(0.22,1,0.36,1),width 0.44s cubic-bezier(0.22,1,0.36,1)":"none", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"absolute", top:0, left:glowX-16, width:32, height:3, background:C.accent, borderRadius:"0 0 8px 8px", transition:mounted?"left 0.44s cubic-bezier(0.22,1,0.36,1)":"none", boxShadow:`0 0 8px ${C.accent}AA,0 0 20px ${C.accent}66,0 0 40px ${C.accent}33`, pointerEvents:"none", zIndex:2 }}/>
      {items.map((item,i)=>(
        <button key={item.id} ref={el=>{itemRefs.current[i]=el;}} onClick={()=>onTabChange(item.id)}
          style={{ position:"relative", padding:"8px 24px", background:"transparent", border:"none", borderRadius:100, cursor:"pointer", color:tab===item.id?C.accent:C.muted, fontFamily:sans, fontSize:13, fontWeight:tab===item.id?600:400, transition:"color 0.28s", zIndex:1 }}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Tag = ({label, color}) => (
  <span style={{display:"inline-block",padding:"2px 8px",background:`${color||C.accent}15`,border:`1px solid ${color||C.accent}40`,color:color||C.accent,fontSize:9,letterSpacing:"0.18em",fontFamily:mono,borderRadius:R.xs}}>{label}</span>
);

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
function FeaturedCard({item, glyphKey, isLast, onOpenModal, inCart}) {
  const [hov, setHov] = useState(false);
  const Glyph = GLYPHS[glyphKey];
  const cc = CAT[item?.category] || C.accent;
  if (!item) return null;
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onOpenModal(item)}
      style={{
        padding:"36px 28px 32px",
        borderRight: isLast ? "none" : `1px solid ${C.border}`,
        cursor:"pointer",
        transition:"transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease, background 0.22s ease",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        background: hov ? C.surface : "rgba(255,255,255,0.62)",
        boxShadow: hov ? "0 12px 40px rgba(26,28,30,0.10), 0 2px 8px rgba(26,28,30,0.05)" : "0 1px 6px rgba(26,28,30,0.05), inset 0 0 0 1px rgba(255,255,255,0.7)",
        borderRadius: R.card,
        display:"flex", flexDirection:"column",
        position:"relative",
      }}
    >
      {/* Glyph / image */}
      <div style={{
        height:140, display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:22,
        transition:"transform 0.4s ease",
        transform: hov ? "scale(1.07)" : "scale(1)",
      }}>
        {item.image
          ? <img src={item.image} alt={item.name}
              style={{height:130,width:130,objectFit:"contain",
              filter:"drop-shadow(0 4px 12px rgba(44,95,84,0.15))"}}/>
          : Glyph && <Glyph size={88}/>
        }
      </div>

      {/* Thin rule — animates colour on hover */}
      <div style={{
        height:1,
        background: hov ? cc : C.border,
        marginBottom:18,
        transition:"background 0.3s ease",
      }}/>

      {/* Category */}
      <div style={{
        fontSize:8, letterSpacing:"0.34em", color:cc,
        fontFamily:mono, marginBottom:9, textTransform:"uppercase",
      }}>{item.category}</div>

      {/* Name */}
      <div style={{
        fontFamily:serif, fontSize:19, fontWeight:700,
        color:C.ink, lineHeight:1.2, marginBottom:11,
        transition:"color 0.2s",
      }}>{item.name}</div>

      {/* Short desc — 3 lines max */}
      <p style={{
        fontSize:12, color:C.ink2, lineHeight:1.85,
        marginBottom:22, fontFamily:sans, flex:1,
        display:"-webkit-box", WebkitLineClamp:3,
        WebkitBoxOrient:"vertical", overflow:"hidden",
      }}>{item.desc}</p>

      {/* Price + CTA row */}
      <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
        <span style={{fontFamily:serif, fontSize:17, fontWeight:700, color:C.ink}}>€{item.sellPrice}</span>
        <span style={{
          fontSize:10, color: hov ? cc : C.dim,
          fontFamily:mono, letterSpacing:"0.12em",
          borderBottom:`1px solid ${hov ? cc : "transparent"}`,
          paddingBottom:1,
          transition:"all 0.22s",
        }}>Explore →</span>
      </div>

      {/* In-cart badge */}
      {inCart && (
        <div style={{
          position:"absolute", top:12, right:12,
          background:C.accentLt, border:`1px solid ${C.accentMd}`,
          borderRadius:R.xs, padding:"2px 7px",
          fontSize:8, color:C.accent, fontFamily:mono, letterSpacing:"0.16em",
        }}>IN ORDER</div>
      )}
    </div>
  );
}

// ─── FEATURED SECTION ─────────────────────────────────────────────────────────
function FeaturedSection({onOpenModal, cartIds}) {
  return (
    <div style={{
      background:"#ECEAE4",
      borderBottom:`1px solid ${C.border}`,
      padding:"72px 40px 68px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Faint large background letter */}
      <div style={{
        position:"absolute", right:-40, top:-20,
        fontFamily:serif, fontSize:380, fontWeight:700,
        color:C.border, lineHeight:1, pointerEvents:"none",
        userSelect:"none", opacity:0.55, letterSpacing:"-0.05em",
      }}>V</div>

      <div style={{maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1}}>
        {/* Section header */}
        <div style={{
          display:"flex", alignItems:"flex-end",
          justifyContent:"space-between", marginBottom:52,
          flexWrap:"wrap", gap:24,
        }}>
          <div>
            <div style={{
              fontSize:8, letterSpacing:"0.46em", color:C.muted,
              fontFamily:mono, marginBottom:18, textTransform:"uppercase",
              display:"flex", alignItems:"center", gap:12,
            }}>
              <div style={{width:24, height:"1px", background:C.accentMd}}/>
              Researcher's Selection · 2025
            </div>
            <h2 style={{
              fontFamily:serif, fontSize:"clamp(28px,3.2vw,46px)",
              fontWeight:700, color:C.ink, lineHeight:1.08, margin:0,
            }}>
              Five compounds<br/>
              <em style={{fontStyle:"italic", color:C.accent}}>worth knowing.</em>
            </h2>
          </div>

          <p style={{
            fontSize:13, color:C.muted, fontFamily:sans,
            maxWidth:260, lineHeight:1.85, textAlign:"right",
          }}>
            A curated selection of our most-studied research compounds, chosen for breadth of application and depth of published research.
          </p>
        </div>

        {/* Full-width divider */}
        <div style={{
          height:1,
          background:`linear-gradient(90deg, ${C.accent}50, ${C.accentMd}, ${C.border}80)`,
          marginBottom:0,
        }}/>

        {/* Products grid */}
        <div className="featured-grid" style={{
          display:"grid",
          gridTemplateColumns:"repeat(5,1fr)",
        }}>
          {FEATURED.map(({item, glyphKey}, i) => (
            <FeaturedCard
              key={glyphKey}
              item={item}
              glyphKey={glyphKey}
              isLast={i===FEATURED.length-1}
              onOpenModal={onOpenModal}
              inCart={item && cartIds.includes(item.name)}
            />
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{
          height:1,
          background:`linear-gradient(90deg, ${C.border}80, ${C.accentMd}, ${C.accent}50)`,
        }}/>

        {/* Footer note */}
        <div style={{
          display:"flex", justifyContent:"flex-end", marginTop:20,
        }}>
          <div style={{
            fontSize:9, color:C.dim, fontFamily:mono,
            letterSpacing:"0.22em", textTransform:"uppercase",
          }}>
            Explore all compounds in the catalogue above ↑
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SPIRAL CANVAS ────────────────────────────────────────────────────────────
function SpiralCanvas() {
  const canvasRef = useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vert = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;
    const frag = `
      precision highp float;
      uniform float u_time; uniform vec2 u_res;
      void main(){
        vec2 uv=(gl_FragCoord.xy/u_res)*2.0-1.0;
        uv.x*=u_res.x/u_res.y;
        vec3 bg=vec3(0.957,0.949,0.929);
        vec3 col=bg;
        for(int k=0;k<18;k++){
          float fk=float(k);
          float angle=fk*0.37+u_time*(0.12+fk*0.008);
          float r=0.05+fk*0.055;
          vec2 centre=vec2(sin(u_time*0.07+fk*0.8)*0.25,cos(u_time*0.05+fk*0.6)*0.22);
          vec2 d=uv-centre; float dist=length(d);
          float theta=atan(d.y,d.x);
          float arm=mod(theta-angle-dist*4.5,6.2832);
          float armDist=min(arm,6.2832-arm);
          float ringDist=abs(dist-r);
          float line=smoothstep(0.025,0.0,armDist*dist+ringDist*0.4);
          float t=fk/17.0;
          vec3 teal=mix(vec3(0.173,0.373,0.329),vec3(0.761,0.851,0.835),t);
          col+=teal*line*(0.55-t*0.2);
        }
        gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
      }
    `;
    const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;};
    const prog=gl.createProgram();
    gl.attachShader(prog,compile(gl.VERTEX_SHADER,vert));
    gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,frag));
    gl.linkProgram(prog);gl.useProgram(prog);
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(prog,"a_pos");
    gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const uTime=gl.getUniformLocation(prog,"u_time");
    const uRes=gl.getUniformLocation(prog,"u_res");
    let raf;
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;gl.viewport(0,0,canvas.width,canvas.height);};
    window.addEventListener("resize",resize);resize();
    const draw=(t)=>{gl.uniform1f(uTime,t*0.001);gl.uniform2f(uRes,canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(draw);};
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}}/>;
}

// ─── ANIMATED STATS ───────────────────────────────────────────────────────────
function AnimatedStats() {
  const stats = [
    {n:"15", label:"Peptide Kits"},
    {n:"07", label:"Single Vials"},
    {n:"04", label:"Research Protocols"},
    {n:"EU", label:"Compliant Delivery"},
    {n:"5",  label:"Payment Methods"},
  ];
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i=>(i+1)%stats.length); setVisible(true); }, 320);
    }, 2400);
    return () => clearInterval(interval);
  }, []);
  const s = stats[idx];
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:200}}>
      <div style={{fontSize:10,letterSpacing:"0.36em",color:"rgba(122,126,132,0.8)",fontFamily:"'Courier Prime','Courier New',monospace",marginBottom:10,textTransform:"uppercase",opacity:1}}>
        What we offer
      </div>
      <div style={{fontFamily:"'Libre Baskerville',Georgia,serif",fontSize:96,fontWeight:700,color:"#1A1C1E",lineHeight:1,letterSpacing:"-0.03em",transform:visible?"translateY(0)":"translateY(-14px)",opacity:visible?1:0,transition:"all 0.32s cubic-bezier(0.22,1,0.36,1)"}}>
        {s.n}
      </div>
      <div style={{fontSize:12,color:"#2C5F54",fontFamily:"'Courier Prime','Courier New',monospace",textTransform:"uppercase",letterSpacing:"0.22em",marginTop:10,transform:visible?"translateY(0)":"translateY(10px)",opacity:visible?1:0,transition:"all 0.36s cubic-bezier(0.22,1,0.36,1) 0.06s"}}>
        {s.label}
      </div>
      <div style={{display:"flex",gap:5,marginTop:16}}>
        {stats.map((_,i)=>(
          <div key={i} style={{width:i===idx?24:6,height:6,borderRadius:3,background:i===idx?"#2C5F54":"#C2D9D5",transition:"all 0.4s ease"}}/>
        ))}
      </div>
    </div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({size=20}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" stroke={C.accent} strokeWidth="1"/>
        <path d="M12 4 L19 18 L5 18 Z" stroke={C.accent} strokeWidth="1.2" fill="none"/>
        <path d="M12 9 L16.5 18 L7.5 18 Z" fill={C.accent} opacity="0.2"/>
      </svg>
      <span style={{fontFamily:serif,fontWeight:700,fontSize:size,letterSpacing:"0.12em",color:C.ink}}>VANTAGEN</span>
    </div>
  );
}

// ─── PRODUCT DETAIL MODAL ────────────────────────────────────────────────────
function ProductModal({item, onClose, onAdd, cartIds}) {
  // Check if this compound has a counterpart (single ↔ kit)
  const kitVersion    = item.hasSingle ? item : KITS.find(k => k.id === item.kitId);
  const singleVersion = item.kitId    ? item : SINGLES.find(s => s.kitId === item.id);
  const hasBoth = !!(kitVersion && singleVersion);

  // Default selection: if user clicked a kit show kit, if single show single
  const isKitItem = item.id?.startsWith("k");
  const [selected, setSelected] = useState(isKitItem ? "kit" : "single");

  const activeItem = hasBoth ? (selected === "kit" ? kitVersion : singleVersion) : item;
  const inCart = cartIds.includes(activeItem.name);
  const cc = CAT[item.category] || C.accent;

  return (
    <div style={{position:"fixed",inset:0,zIndex:3000,background:"rgba(244,242,237,0.9)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.28s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="modal-panel" style={{
        background:C.surface,border:`1px solid ${C.borderMd}`,borderRadius:R.card,
        width:"100%",maxWidth:620,maxHeight:"90vh",overflowY:"auto",
        boxShadow:"0 20px 80px rgba(26,28,30,0.2)",
        display:"flex",flexDirection:"column",
        animation:"scaleIn 0.32s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Top colour bar */}
        <div style={{height:4,background:`linear-gradient(90deg, ${cc}, ${cc}80)`,borderRadius:`${R.card}px ${R.card}px 0 0`}}/>

        {/* Header */}
        <div style={{padding:"24px 28px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:9,letterSpacing:"0.26em",color:cc,fontFamily:mono,marginBottom:8,textTransform:"uppercase"}}>{item.category}</div>
            <h2 style={{fontFamily:serif,fontSize:24,fontWeight:700,color:C.ink,lineHeight:1.1,marginBottom:6}}>{item.name}</h2>
            {item.badge && <Tag label={item.badge} color={cc}/>}
          </div>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",padding:"6px 11px",borderRadius:R.sm,fontSize:15,flexShrink:0,marginLeft:16}}>✕</button>
        </div>

        {/* Body */}
        <div style={{padding:"24px 28px",flex:1}}>
          {/* Kit / Single toggle */}
          {hasBoth && (
            <div style={{marginBottom:24}}>
              <div style={{fontSize:9,letterSpacing:"0.22em",color:C.muted,fontFamily:mono,textTransform:"uppercase",marginBottom:10}}>Format</div>
              <div style={{display:"flex",gap:8}}>
                {[["kit","Kit (10 vials)",kitVersion],["single","Single vial",singleVersion]].map(([val,label,ver])=>(
                  <button key={val} onClick={()=>setSelected(val)} style={{
                    flex:1, padding:"11px 16px",
                    background: selected===val ? C.accentLt : C.surface2,
                    border:`1px solid ${selected===val ? C.accentMd : C.border}`,
                    borderRadius:R.sm,cursor:"pointer",transition:"all 0.18s",
                    textAlign:"left",
                  }}>
                    <div style={{fontSize:12,fontWeight:600,color:selected===val?C.accent:C.ink,fontFamily:sans,marginBottom:3}}>{label}</div>
                    <div style={{fontSize:11,color:C.muted,fontFamily:mono}}>{ver?.mg}</div>
                    <div style={{fontSize:16,fontWeight:700,color:selected===val?C.accent:C.ink,fontFamily:serif,marginTop:4}}>€{ver?.sellPrice}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price (when no toggle) */}
          {!hasBoth && (
            <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:20}}>
              <span style={{fontFamily:serif,fontSize:28,fontWeight:700,color:C.ink}}>€{item.sellPrice}</span>
              <span style={{fontSize:12,color:C.muted,fontFamily:mono}}>{item.mg}</span>
            </div>
          )}

          {/* Product image */}
          {item.image && (
            <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
              <img src={item.image} alt={item.name} style={{height:180,objectFit:"contain"}} />
            </div>
          )}

          {/* Full description */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:9,letterSpacing:"0.22em",color:C.muted,fontFamily:mono,textTransform:"uppercase",marginBottom:12}}>About this compound</div>
            {(item.fullDesc||item.desc).split("\n\n").map((para,i)=>(
              <p key={i} style={{fontSize:13,color:C.ink2,lineHeight:1.9,marginBottom:12,fontFamily:sans}}>{para}</p>
            ))}
          </div>

          {/* Research disclaimer */}
          <div style={{padding:"12px 14px",background:"#FDF5F4",border:"1px solid #d4a59a",borderRadius:R.sm,marginBottom:24,fontSize:11,color:C.red,fontFamily:mono,lineHeight:1.7,letterSpacing:"0.02em"}}>
            ⚠ This compound is supplied strictly for in-vitro and laboratory research purposes only. It is not intended for human or veterinary use. For use by qualified scientific professionals in regulated environments only.
          </div>
        </div>

        {/* Footer / Add button */}
        <div style={{padding:"0 28px 24px"}}>
          <button
            onClick={()=>{ onAdd(activeItem); onClose(); }}
            style={{
              width:"100%",padding:"14px",
              background: inCart ? C.surface2 : C.accent,
              border:`1px solid ${inCart ? C.borderMd : C.accent}`,
              color: inCart ? C.muted : "#fff",
              fontFamily:mono,fontSize:11,letterSpacing:"0.18em",
              cursor: inCart ? "default" : "pointer",
              borderRadius:R.sm,transition:"all 0.18s",
            }}
          >
            {inCart ? "✓  Already in your order" : `Add to order  ·  €${activeItem.sellPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── KIT CARD ────────────────────────────────────────────────────────────────
function KitCard({item, onAdd, inCart, onOpenModal}) {
  const [hov, setHov] = useState(false);
  const cc = CAT[item.category] || C.accent;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:C.surface,border:`1px solid ${hov?C.borderMd:C.border}`,borderRadius:R.card,padding:"24px",transition:"all 0.22s",boxShadow:hov?"0 4px 24px rgba(26,28,30,0.10)":"0 1px 4px rgba(26,28,30,0.05)",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",cursor:"pointer",flex:1}}
      onClick={()=>onOpenModal(item)}
    >
      {item.image && (
        <div style={{width:"100%",height:160,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,borderBottom:`1px solid ${C.border}`,paddingBottom:16}}>
          <img src={item.image} alt={item.name}
            style={{height:148,objectFit:"contain",
            filter:"drop-shadow(0 4px 16px rgba(44,95,84,0.12))"}}/>
        </div>
      )}
      <div style={{position:"absolute",left:0,top:16,bottom:16,width:3,background:cc,borderRadius:"0 2px 2px 0",opacity:hov?1:0.5,transition:"opacity 0.22s"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,paddingLeft:8}}>
        <div>
          <div style={{fontSize:8,letterSpacing:"0.28em",color:cc,fontFamily:mono,marginBottom:7,textTransform:"uppercase"}}>{item.category}</div>
          <div style={{fontSize:17,fontWeight:700,color:C.ink,fontFamily:serif,lineHeight:1.2}}>{item.name}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:3,fontFamily:mono}}>{item.mg}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          {item.badge&&<div style={{marginBottom:8}}><Tag label={item.badge} color={cc}/></div>}
          <div style={{fontSize:22,fontWeight:700,color:C.ink,fontFamily:serif}}>€{item.sellPrice}</div>
          {item.hasSingle && <div style={{fontSize:9,color:C.muted,fontFamily:mono,marginTop:3}}>also single vial</div>}
        </div>
      </div>
      <p style={{fontSize:13,color:C.ink2,lineHeight:1.8,flex:1,marginBottom:18,paddingLeft:8}}>{item.desc}</p>
      <div style={{paddingLeft:8,display:"flex",gap:8}}>
        <button onClick={e=>{e.stopPropagation();onOpenModal(item);}} style={{flex:1,padding:"9px",background:C.surface2,border:`1px solid ${C.border}`,color:C.muted,fontFamily:mono,fontSize:9,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s"}}>View details</button>
        <button onClick={e=>{e.stopPropagation();onAdd(item);}} style={{flex:2,padding:"9px",background:inCart?C.accentLt:C.surface2,border:`1px solid ${inCart?C.accentMd:C.border}`,color:inCart?C.accent:C.ink2,fontFamily:mono,fontSize:9,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s"}}>
          {inCart?"✓ Added":"Add to order"}
        </button>
      </div>
    </div>
  );
}

// ─── SINGLE ROW ──────────────────────────────────────────────────────────────
function SingleRow({item, onAdd, inCart, onOpenModal}) {
  const [hov, setHov] = useState(false);
  const cc = CAT[item.category] || C.muted;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:C.surface,border:`1px solid ${hov?C.borderMd:C.border}`,borderRadius:R.sm,padding:"16px 20px",transition:"all 0.2s",display:"flex",alignItems:"center",gap:18,boxShadow:hov?"0 4px 24px rgba(26,28,30,0.10)":"0 1px 4px rgba(26,28,30,0.05)",cursor:"pointer"}}
      onClick={()=>onOpenModal(item)}
    >
      <div style={{width:3,height:36,background:cc,borderRadius:R.xs,flexShrink:0,opacity:0.6}}/>
      {item.image && (
        <img src={item.image} alt={item.name}
          style={{width:72,height:72,objectFit:"contain",flexShrink:0,
          filter:"drop-shadow(0 2px 8px rgba(44,95,84,0.12))"}}/>
      )}
      <div style={{flex:1}}>
        <div style={{fontSize:8,letterSpacing:"0.26em",color:cc,fontFamily:mono,marginBottom:4,textTransform:"uppercase"}}>{item.category}</div>
        <div style={{fontSize:15,fontWeight:700,color:C.ink,fontFamily:serif}}>{item.name}</div>
        <div style={{fontSize:11,color:C.muted,fontFamily:mono,marginTop:1}}>{item.mg}</div>
        <div style={{fontSize:12,color:C.ink2,marginTop:6,lineHeight:1.7}}>{item.desc}</div>
        {item.kitId && <div style={{fontSize:9,color:C.accent,fontFamily:mono,marginTop:4}}>also available as 10-vial kit</div>}
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:18,fontWeight:700,color:C.ink,fontFamily:serif,marginBottom:8}}>€{item.sellPrice}</div>
        <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
          <button onClick={e=>{e.stopPropagation();onOpenModal(item);}} style={{padding:"6px 10px",background:C.surface2,border:`1px solid ${C.border}`,color:C.muted,fontFamily:mono,fontSize:8,letterSpacing:"0.12em",cursor:"pointer",borderRadius:R.sm}}>Details</button>
          <button onClick={e=>{e.stopPropagation();onAdd(item);}} style={{padding:"6px 12px",background:inCart?C.accentLt:C.surface2,border:`1px solid ${inCart?C.accentMd:C.border}`,color:inCart?C.accent:C.ink2,fontFamily:mono,fontSize:8,letterSpacing:"0.12em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s"}}>{inCart?"✓ Added":"+ Add"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── STACK CARD ──────────────────────────────────────────────────────────────
function StackCard({stack, onAddStack, cartIds}) {
  const [hov, setHov] = useState(false);
  const items = stack.peptides.map(n=>[...KITS,...SINGLES].find(p=>p.name===n)).filter(Boolean);
  const tot = items.reduce((s,p)=>s+p.sellPrice,0);
  const disc = Math.round(tot*0.85);
  const allIn = stack.peptides.every(n=>cartIds.includes(n));
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:C.surface,border:`1px solid ${hov?C.borderMd:C.border}`,borderRadius:R.card,padding:"24px",transition:"all 0.22s",boxShadow:hov?"0 4px 24px rgba(26,28,30,0.10)":"0 1px 4px rgba(26,28,30,0.05)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:stack.color,opacity:0.7,borderRadius:"6px 6px 0 0"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,marginTop:8}}>
        <div>
          <div style={{fontSize:8,letterSpacing:"0.28em",color:stack.color,fontFamily:mono,marginBottom:7,textTransform:"uppercase"}}>{stack.tagline}</div>
          <div style={{fontSize:18,fontWeight:700,color:C.ink,fontFamily:serif}}>{stack.name}</div>
        </div>
        <Tag label="15% OFF" color={stack.color}/>
      </div>
      <p style={{fontSize:13,color:C.ink2,lineHeight:1.8,marginBottom:16}}>{stack.desc}</p>
      <div style={{marginBottom:18,padding:"12px 14px",background:C.surface2,borderRadius:R.sm,border:`1px solid ${C.border}`}}>
        {stack.peptides.map(n=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <div style={{width:4,height:4,borderRadius:"50%",background:stack.color,flexShrink:0}}/>
            <span style={{fontSize:11,color:C.ink2,fontFamily:mono}}>{n}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <span style={{fontSize:11,color:C.dim,textDecoration:"line-through",marginRight:8,fontFamily:mono}}>€{tot}</span>
          <span style={{fontSize:22,fontWeight:700,color:C.ink,fontFamily:serif}}>€{disc}</span>
        </div>
        <button onClick={()=>onAddStack(stack)} style={{padding:"9px 18px",background:allIn?C.accentLt:C.surface2,border:`1px solid ${allIn?C.accentMd:C.border}`,color:allIn?C.accent:C.ink2,fontFamily:mono,fontSize:10,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s"}}>
          {allIn?"✓ In order":"Add protocol"}
        </button>
      </div>
    </div>
  );
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
function CheckoutModal({cart, onClose, onSuccess}) {
  const [step, setStep]     = useState("method");
  const [method, setMethod] = useState(null);
  const [form, setForm]     = useState({name:"",street:"",postCode:"",city:"",country:"",phone:"",email:""});
  const [agreed, setAgreed] = useState(false);
  const total = cart.reduce((s,p)=>s+p.sellPrice,0);
  const canProceed = form.name&&form.street&&form.postCode&&form.city&&form.email&&form.phone;

  const buildSummary = () => {
    const items = cart.map(p=>`  • ${p.name} (${p.mg})`).join("\n");
    return `Items you want:\n${items}\n\nName: ${form.name}\nStreet: ${form.street}\nPost Code: ${form.postCode}\nCity: ${form.city}\nCountry: ${form.country}\nPhone number: ${form.phone}\nMail: ${form.email}\nPayment method: ${METHODS.find(m=>m.id===method)?.label||""}`;
  };

  const placeOrder = () => {
    const subj = encodeURIComponent(`VANTAGEN Order — ${form.name}`);
    const body = encodeURIComponent(buildSummary());
    window.open(`mailto:orders@vantagen.com?subject=${subj}&body=${body}`);
    onSuccess(buildSummary());
  };

  const Inp = ({k,label,ph,type="text"}) => (
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:8,letterSpacing:"0.24em",color:C.muted,marginBottom:5,fontFamily:mono,textTransform:"uppercase"}}>{label}</label>
      <input type={type} placeholder={ph} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
        style={{width:"100%",padding:"10px 13px",background:C.surface2,border:`1px solid ${C.border}`,borderRadius:R.sm,color:C.ink,fontFamily:mono,fontSize:12,outline:"none",boxSizing:"border-box",transition:"border-color 0.18s"}}
        onFocus={e=>e.target.style.borderColor=C.accentMd} onBlur={e=>e.target.style.borderColor=C.border}/>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(244,242,237,0.88)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"fadeIn 0.28s ease"}}>
      <div className="checkout-panel" style={{background:C.surface,border:`1px solid ${C.borderMd}`,borderRadius:R.card,width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 16px 64px rgba(26,28,30,0.18)",animation:"scaleIn 0.34s cubic-bezier(0.22,1,0.36,1)"}}>
        <div style={{padding:"18px 26px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:C.surface,zIndex:1}}>
          <div>
            <div style={{fontFamily:serif,fontSize:15,fontWeight:700,color:C.ink}}>Place Order</div>
            <div style={{fontSize:8,color:C.muted,marginTop:3,fontFamily:mono,letterSpacing:"0.22em",textTransform:"uppercase"}}>
              {step==="method"?"01 — Payment method":step==="details"?"02 — Shipping details":"03 — Confirm & send"}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontFamily:serif,fontSize:18,fontWeight:700,color:C.ink}}>€{total}</span>
            <button onClick={onClose} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",padding:"5px 9px",borderRadius:R.sm,fontSize:14}}>✕</button>
          </div>
        </div>

        <div style={{padding:26}}>
          {step==="method"&&(
            <div>
              <p style={{fontSize:13,color:C.ink2,marginBottom:20,lineHeight:1.8}}>Select your preferred payment method. All options are available to EU customers.</p>
              {METHODS.map(m=>(
                <div key={m.id} onClick={()=>setMethod(m.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",marginBottom:8,border:`1px solid ${method===m.id?C.accentMd:C.border}`,borderRadius:R.sm,cursor:"pointer",background:method===m.id?C.accentLt:C.surface2,transition:"all 0.18s"}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:method===m.id?C.accentMd:C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:mono,fontSize:12,color:method===m.id?C.accent:C.muted,transition:"all 0.18s"}}>{m.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:C.ink,fontSize:13,fontWeight:600,marginBottom:2,fontFamily:sans}}>{m.label}</div>
                    <div style={{color:C.muted,fontSize:11,fontFamily:mono}}>{m.sub}</div>
                  </div>
                  <div style={{width:16,height:16,borderRadius:"50%",flexShrink:0,border:`2px solid ${method===m.id?C.accent:C.dim}`,background:method===m.id?C.accent:"transparent",transition:"all 0.18s"}}/>
                </div>
              ))}
              {method&&<div style={{padding:"12px 14px",marginTop:8,marginBottom:18,background:C.accentLt,border:`1px solid ${C.accentMd}`,borderRadius:R.sm,fontSize:12,color:C.accent,lineHeight:1.75,fontFamily:sans}}>{METHODS.find(m=>m.id===method)?.note}</div>}
              <button disabled={!method} onClick={()=>setStep("details")} style={{width:"100%",padding:"12px",background:method?C.accentLt:C.surface2,border:`1px solid ${method?C.accentMd:C.border}`,color:method?C.accent:C.muted,fontFamily:mono,fontSize:10,letterSpacing:"0.16em",cursor:method?"pointer":"not-allowed",borderRadius:R.sm,opacity:method?1:0.5}}>Continue →</button>
            </div>
          )}

          {step==="details"&&(
            <div>
              <p style={{fontSize:13,color:C.ink2,marginBottom:18,lineHeight:1.8}}>Shipping details — forwarded to our supplier in their required format.</p>
              <Inp k="name" label="Full Name" ph="Dr. Jan Novak"/>
              <Inp k="street" label="Street" ph="Hauptstraße 12"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:12}}>
                <Inp k="postCode" label="Post Code" ph="10115"/>
                <Inp k="city" label="City" ph="Berlin"/>
              </div>
              <Inp k="country" label="Country" ph="e.g. Germany"/>
              <Inp k="phone" label="Phone Number" ph="+49 30 0000000" type="tel"/>
              <Inp k="email" label="Email Address" ph="jan@example.com" type="email"/>
              <div onClick={()=>setAgreed(!agreed)} style={{display:"flex",alignItems:"flex-start",gap:12,padding:13,marginTop:4,marginBottom:18,border:`1px solid ${agreed?C.accentMd:"#d4a59a"}`,borderRadius:R.sm,cursor:"pointer",background:agreed?C.accentLt:"#fdf5f4",transition:"all 0.18s"}}>
                <div style={{width:15,height:15,borderRadius:R.xs,flexShrink:0,marginTop:1,border:`2px solid ${agreed?C.accent:"#c0392b"}`,background:agreed?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.18s"}}>
                  {agreed&&<span style={{color:"#fff",fontSize:9,fontWeight:700}}>✓</span>}
                </div>
                <p style={{fontSize:11,color:C.ink2,lineHeight:1.8,margin:0}}>I confirm these compounds are purchased <strong style={{color:C.ink}}>strictly for in-vitro research purposes only</strong> and will not be used for human or veterinary consumption. I am 18+ and purchasing from a jurisdiction where such compounds are legal.</p>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setStep("method")} style={{padding:"11px 16px",background:C.surface2,border:`1px solid ${C.border}`,color:C.muted,fontFamily:mono,fontSize:9,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm}}>← Back</button>
                <button disabled={!canProceed||!agreed} onClick={()=>setStep("confirm")} style={{flex:1,padding:"11px",background:canProceed&&agreed?C.accentLt:C.surface2,border:`1px solid ${canProceed&&agreed?C.accentMd:C.border}`,color:canProceed&&agreed?C.accent:C.muted,fontFamily:mono,fontSize:10,letterSpacing:"0.16em",cursor:canProceed&&agreed?"pointer":"not-allowed",borderRadius:R.sm,opacity:canProceed&&agreed?1:0.5}}>Review order →</button>
              </div>
            </div>
          )}

          {step==="confirm"&&(
            <div>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:8,letterSpacing:"0.24em",color:C.muted,marginBottom:10,fontFamily:mono,textTransform:"uppercase"}}>Order Summary — Supplier Format</div>
                <div style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:R.sm,padding:"16px",fontFamily:mono,fontSize:11,color:C.ink2,lineHeight:2,whiteSpace:"pre-wrap"}}>
                  <span style={{color:C.accent,fontWeight:700}}>Items you want:</span>{"\n"}
                  {cart.map(p=>`  • ${p.name} (${p.mg})`).join("\n")}{"\n\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Name:</span> {form.name}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Street:</span> {form.street}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Post Code:</span> {form.postCode}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>City:</span> {form.city}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Country:</span> {form.country}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Phone number:</span> {form.phone}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Mail:</span> {form.email}{"\n"}
                  <span style={{color:C.accent,fontWeight:700}}>Payment method:</span> {METHODS.find(m=>m.id===method)?.label}
                </div>
              </div>
              {method==="crypto"&&<div style={{padding:16,background:C.goldLt,border:`1px solid ${C.gold}40`,borderRadius:R.sm,marginBottom:18}}>
                <div style={{fontSize:8,color:C.gold,letterSpacing:"0.22em",marginBottom:12,fontFamily:mono,textTransform:"uppercase"}}>Crypto Wallets</div>
                {[["BTC","bc1q — replace-with-your-wallet"],["USDT TRC-20","T — replace-with-your-wallet"]].map(([k,v])=>(
                  <div key={k} style={{marginBottom:10}}>
                    <div style={{fontSize:8,color:C.muted,marginBottom:3,fontFamily:mono,textTransform:"uppercase"}}>{k}</div>
                    <div style={{fontSize:11,color:C.ink,fontFamily:mono,background:C.surface,padding:"7px 10px",borderRadius:R.xs,border:`1px solid ${C.border}`,wordBreak:"break-all"}}>{v}</div>
                  </div>
                ))}
              </div>}
              {method==="bank"&&<div style={{padding:16,background:"#EEF2F9",border:`1px solid ${CAT["Weight Loss"]}30`,borderRadius:R.sm,marginBottom:18}}>
                <div style={{fontSize:8,color:CAT["Weight Loss"],letterSpacing:"0.22em",marginBottom:12,fontFamily:mono,textTransform:"uppercase"}}>European Bank Transfer (SEPA)</div>
                {[["Account Name","VANTAGEN s.r.o."],["IBAN","— replace with your IBAN —"],["BIC/SWIFT","— replace with your BIC —"],["Reference",`ORD-${Math.floor(Math.random()*90000)+10000}`]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{color:C.muted,fontFamily:mono,fontSize:9,textTransform:"uppercase"}}>{k}</span>
                    <span style={{color:C.ink,fontFamily:mono,fontSize:11,fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>}
              {method==="revolut"&&<div style={{padding:16,background:C.accentLt,border:`1px solid ${C.accentMd}`,borderRadius:R.sm,marginBottom:18}}>
                <div style={{fontSize:8,color:C.accent,letterSpacing:"0.22em",marginBottom:8,fontFamily:mono,textTransform:"uppercase"}}>Revolut Pay</div>
                <div style={{fontSize:15,color:C.ink,fontFamily:mono,marginBottom:6,fontWeight:600}}>@vantagen</div>
                <p style={{fontSize:11,color:C.ink2,lineHeight:1.7}}>Send €{total} on Revolut to @vantagen. Include your name in the note.</p>
              </div>}
              {method==="card"&&<div style={{padding:16,background:C.accentLt,border:`1px solid ${C.accentMd}`,borderRadius:R.sm,marginBottom:18,textAlign:"center"}}>
                <div style={{fontSize:8,color:C.accent,letterSpacing:"0.22em",marginBottom:8,fontFamily:mono,textTransform:"uppercase"}}>Card Payment</div>
                <p style={{fontSize:12,color:C.ink2,lineHeight:1.8}}>After sending your order, we will email you a secure Revolut payment link. Visa & Mastercard accepted.</p>
              </div>}
              {method==="paypal"&&<div style={{padding:16,background:"#EFF5FC",border:"1px solid #003087AA",borderRadius:R.sm,marginBottom:18}}>
                <div style={{fontSize:8,color:"#003087",letterSpacing:"0.22em",marginBottom:8,fontFamily:mono,textTransform:"uppercase"}}>PayPal — Friends & Family</div>
                <div style={{fontSize:14,color:C.ink,fontFamily:mono,marginBottom:6,fontWeight:600}}>payments@vantagen.com</div>
                <p style={{fontSize:11,color:C.ink2,lineHeight:1.7}}>Send as <strong>Friends & Family</strong> only. Include your name in the note.</p>
              </div>}
              <div style={{fontSize:11,color:C.ink2,lineHeight:1.8,marginBottom:18,padding:"12px 14px",background:C.surface2,borderRadius:R.sm,border:`1px solid ${C.border}`}}>Clicking "Send order" will open your email client with the full order pre-filled. Send the email to complete your purchase — we confirm within 24 hours.</div>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setStep("details")} style={{padding:"11px 16px",background:C.surface2,border:`1px solid ${C.border}`,color:C.muted,fontFamily:mono,fontSize:9,cursor:"pointer",borderRadius:R.sm}}>← Back</button>
                <button onClick={placeOrder} style={{flex:1,padding:"12px",background:C.accent,border:`1px solid ${C.accent}`,color:"#fff",fontFamily:mono,fontSize:10,letterSpacing:"0.16em",cursor:"pointer",borderRadius:R.sm}}>Send order →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────
function CartDrawer({cart, onRemove, onClose, onCheckout, visible}) {
  const total = cart.reduce((s,p)=>s+p.sellPrice,0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex"}}>
      <div onClick={onClose} style={{
        flex:1, background:"rgba(244,242,237,0.7)", backdropFilter:"blur(4px)",
        opacity: visible ? 1 : 0,
        transition:"opacity 0.34s ease",
      }}/>
      <div className="cart-drawer" style={{
        width:340, background:C.surface,
        borderLeft:`1px solid ${C.border}`,
        display:"flex", flexDirection:"column",
        boxShadow:"-4px 0 32px rgba(26,28,30,0.14)",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition:"transform 0.38s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:serif,fontSize:15,fontWeight:700,color:C.ink}}>Your Order</div>
            <div style={{fontSize:9,color:C.muted,marginTop:2,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.2em"}}>{cart.length} item{cart.length!==1?"s":""}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",padding:"5px 10px",borderRadius:R.sm,fontSize:12,fontFamily:mono}}>Close</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"10px 22px"}}>
          {cart.length===0
            ?<div style={{textAlign:"center",padding:"48px 0",color:C.dim,fontSize:13,fontFamily:sans}}>Your order is empty.</div>
            :cart.map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"13px 0",borderBottom:`1px solid ${C.border}`}}>
                <div>
                  <div style={{color:C.ink,fontSize:13,fontWeight:600,fontFamily:serif}}>{item.name}</div>
                  <div style={{color:C.muted,fontSize:10,marginTop:2,fontFamily:mono}}>{item.mg}</div>
                  <div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>
                    {item.id?.startsWith("k")&&<Tag label="KIT" color={C.accent}/>}
                    {item.stackDiscount&&<Tag label="15% OFF" color={C.gold}/>}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                  <span style={{color:C.ink,fontFamily:serif,fontSize:14,fontWeight:700}}>€{item.sellPrice}</span>
                  <button onClick={()=>onRemove(i)} style={{background:"none",border:"none",color:C.dim,cursor:"pointer",fontSize:16,padding:0}}>×</button>
                </div>
              </div>
            ))
          }
        </div>
        {cart.length>0&&(
          <div style={{padding:"18px 22px",borderTop:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"13px 14px",marginBottom:14,background:C.accentLt,border:`1px solid ${C.accentMd}`,borderRadius:R.sm}}>
              <span style={{color:C.muted,fontFamily:mono,fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",alignSelf:"center"}}>Total</span>
              <span style={{color:C.ink,fontFamily:serif,fontSize:20,fontWeight:700}}>€{total}</span>
            </div>
            <button onClick={onCheckout} style={{width:"100%",padding:"12px",background:C.accent,border:`1px solid ${C.accent}`,color:"#fff",fontFamily:mono,fontSize:10,letterSpacing:"0.16em",cursor:"pointer",borderRadius:R.sm,marginBottom:10}}>Proceed to checkout →</button>
            <p style={{textAlign:"center",fontSize:9,color:C.dim,lineHeight:1.8,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>For research purposes only · Not for human use</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WEBGL WAVE BACKGROUND ───────────────────────────────────────────────────
function WaveCanvas() {
  const canvasRef = useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vert = `attribute vec3 position; void main(){ gl_Position=vec4(position,1.0); }`;
    const frag = `
      precision highp float;
      uniform vec2 resolution; uniform float time;
      uniform float xScale; uniform float yScale; uniform float distortion;
      void main(){
        vec2 p=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
        float d=length(p)*distortion;
        float rx=p.x*(1.0+d); float gx=p.x; float bx=p.x*(1.0-d);
        float r=0.05/abs(p.y+sin((rx+time)*xScale)*yScale);
        float g=0.05/abs(p.y+sin((gx+time)*xScale)*yScale);
        float b=0.05/abs(p.y+sin((bx+time)*xScale)*yScale);
        r=clamp(r,0.0,0.95); g=clamp(g,0.0,0.95); b=clamp(b,0.0,0.95);
        vec3 bg=vec3(0.957,0.949,0.929);
        vec3 col=bg;
        col=mix(col,vec3(0.173,0.373,0.329),r*0.82);
        col=mix(col,vec3(0.240,0.501,0.329),g*0.78);
        col=mix(col,vec3(0.761,0.851,0.835),b*0.65);
        gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
      }
    `;
    const mk=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;};
    const prog=gl.createProgram();
    gl.attachShader(prog,mk(gl.VERTEX_SHADER,vert));
    gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,frag));
    gl.linkProgram(prog);gl.useProgram(prog);
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,-1,0,-1,1,0,1,1,0]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(prog,"position");
    gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);
    const uRes=gl.getUniformLocation(prog,"resolution");
    const uTime=gl.getUniformLocation(prog,"time");
    gl.uniform1f(gl.getUniformLocation(prog,"xScale"),1.0);
    gl.uniform1f(gl.getUniformLocation(prog,"yScale"),0.5);
    gl.uniform1f(gl.getUniformLocation(prog,"distortion"),0.05);
    let t=0; let raf;
    const resize=()=>{canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;gl.viewport(0,0,canvas.width,canvas.height);};
    window.addEventListener("resize",resize);resize();
    const draw=()=>{gl.uniform2f(uRes,canvas.width,canvas.height);gl.uniform1f(uTime,t);t+=0.01;gl.drawArrays(gl.TRIANGLES,0,6);raf=requestAnimationFrame(draw);};
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",top:"-10px",left:"-10px",width:"calc(100% + 20px)",height:"calc(100% + 20px)",display:"block"}}/>;
}

// ─── PASSWORD GATE ─────────────────────────────────────────────────────────────
function PasswordGate({onUnlock}) {
  const [pw, setPw]         = useState("");
  const [email, setEmail]   = useState("");
  const [error, setError]   = useState("");
  const [mode, setMode]     = useState("gate");
  const [joined, setJoined] = useState(false);

  const tryUnlock = () => {
    if(pw===LAUNCH_PW) onUnlock();
    else {setError("Invalid access code."); setTimeout(()=>setError(""),2000);}
  };
  const joinEarly = () => {
    if(!email.includes("@")){setError("Please enter a valid email.");return;}
    setJoined(true); setError("");
  };

  const inpCls = {width:"100%",padding:"12px 15px",background:"rgba(255,255,255,0.8)",border:`1px solid ${C.border}`,borderRadius:R.sm,color:C.ink,fontFamily:mono,fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:8,transition:"border-color 0.18s"};

  return (
    <div style={{minHeight:"100vh",display:"flex",background:C.bg,position:"relative",overflow:"hidden",margin:0,padding:0,boxSizing:"border-box"}}>
      <WaveCanvas/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:0,position:"relative",zIndex:2}}>
        <div style={{width:"100%",maxWidth:420,textAlign:"center",background:"rgba(255,255,255,0.55)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",border:`1px solid rgba(255,255,255,0.7)`,borderRadius:R.card,padding:"44px 40px 36px",boxShadow:"0 8px 48px rgba(44,95,84,0.10)"}}>
          <div style={{marginBottom:44}}>
            <div style={{fontSize:8,letterSpacing:"0.4em",color:C.muted,fontFamily:mono,marginBottom:28,textTransform:"uppercase"}}>Research Compounds · EU</div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke={C.accent} strokeWidth="1.5"/>
                <path d="M24 7 L39 37 L9 37 Z" stroke={C.accent} strokeWidth="2" fill="none"/>
                <path d="M24 17 L34 37 L14 37 Z" fill={C.accent} opacity="0.18"/>
                <line x1="24" y1="7" x2="24" y2="37" stroke={C.accent} strokeWidth="1" opacity="0.35"/>
              </svg>
              <span style={{fontFamily:serif,fontWeight:700,fontSize:52,letterSpacing:"0.06em",color:C.ink,lineHeight:1}}>VANTAGEN</span>
            </div>
            <div style={{width:40,height:1,background:C.accentMd,margin:"22px auto 0"}}/>
          </div>

          <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"5px 14px",borderRadius:20,border:`1px solid ${C.borderMd}`,background:C.surface,marginBottom:32}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:C.accent,animation:"blink 2.5s infinite"}}/>
            <span style={{fontSize:8,letterSpacing:"0.3em",color:C.muted,fontFamily:mono,textTransform:"uppercase"}}>Private Beta</span>
          </div>

          {mode==="gate"?(
            <div key="gate" className="gate-panel">
              <p style={{color:C.ink2,fontSize:13,marginBottom:26,lineHeight:1.85,fontFamily:sans,animation:"panelIn 0.52s cubic-bezier(0.22,1,0.36,1) 0.08s both"}}>Platform currently in private beta. Enter your access code or request early access below.</p>
              <input type="password" placeholder="Access code" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryUnlock()} style={inpCls} onFocus={e=>e.target.style.borderColor=C.accentMd} onBlur={e=>e.target.style.borderColor=C.border}/>
              {error&&<div style={{color:C.red,fontSize:11,marginBottom:8,fontFamily:mono,textAlign:"center",letterSpacing:"0.08em"}}>{error}</div>}
              <button onClick={tryUnlock} onMouseDown={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.boxShadow="0 2px 8px rgba(44,95,84,0.15)";}} onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 16px rgba(44,95,84,0.28)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 16px rgba(44,95,84,0.28)";}} onTouchStart={e=>{e.currentTarget.style.transform="scale(0.94)";}} onTouchEnd={e=>{e.currentTarget.style.transform="scale(1)";}} style={{width:"100%",padding:"13px",background:C.accent,border:`1px solid ${C.accent}`,color:"#fff",fontFamily:mono,fontSize:10,letterSpacing:"0.18em",cursor:"pointer",borderRadius:R.sm,marginBottom:12,transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)"}}>Access Platform →</button>
              <button onClick={()=>setMode("early")} onMouseDown={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onTouchStart={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onTouchEnd={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} style={{width:"100%",padding:"12px",background:C.surface,border:`1px solid ${C.borderMd}`,color:C.ink2,fontFamily:mono,fontSize:10,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)"}}>No code? Request early access →</button>
            </div>
          ):(
            <div key="early" className="gate-panel">
              {!joined?(
                <>
                  <p style={{color:C.ink2,fontSize:13,marginBottom:26,lineHeight:1.85,fontFamily:sans,animation:"panelIn 0.52s cubic-bezier(0.22,1,0.36,1) 0.08s both"}}>Join the VANTAGEN research community and receive early access with exclusive launch pricing.</p>
                  <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} style={inpCls} onFocus={e=>e.target.style.borderColor=C.accentMd} onBlur={e=>e.target.style.borderColor=C.border}/>
                  {error&&<div style={{color:C.red,fontSize:11,marginBottom:8,fontFamily:mono,textAlign:"center",letterSpacing:"0.08em"}}>{error}</div>}
                  <button onClick={joinEarly} onMouseDown={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onTouchStart={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onTouchEnd={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} style={{width:"100%",padding:"13px",background:C.accent,border:`1px solid ${C.accent}`,color:"#fff",fontFamily:mono,fontSize:10,letterSpacing:"0.18em",cursor:"pointer",borderRadius:R.sm,marginBottom:12,transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)"}}>Join Early Access →</button>
                  <button onClick={()=>setMode("gate")} onMouseDown={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} onTouchStart={e=>{e.currentTarget.style.transform="scale(0.94)";e.currentTarget.style.opacity="0.75";}} onTouchEnd={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}} style={{width:"100%",padding:"12px",background:C.surface,border:`1px solid ${C.borderMd}`,color:C.ink2,fontFamily:mono,fontSize:10,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm,transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)"}}>← Have an access code?</button>
                </>
              ):(
                <div style={{padding:28,border:`1px solid ${C.accentMd}`,borderRadius:R.card,background:C.accentLt}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:C.accentMd,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:16,color:C.accent}}>✓</div>
                  <div style={{fontFamily:serif,fontWeight:700,fontSize:15,color:C.ink,marginBottom:10}}>You're on the list</div>
                  <p style={{color:C.ink2,fontSize:13,lineHeight:1.85,fontFamily:sans}}>We'll contact <strong style={{color:C.ink}}>{email}</strong> at launch with early access pricing and exclusive research protocols.</p>
                </div>
              )}
            </div>
          )}
          <p style={{marginTop:44,fontSize:9,color:C.dim,letterSpacing:"0.1em",lineHeight:2.1,fontFamily:mono,textTransform:"uppercase",opacity:0.7}}>For research purposes only · Not for human use<br/>Vantagen © 2025 · EU Regulation Compliant</p>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}.gate-panel{animation:panelIn 0.42s cubic-bezier(0.22,1,0.36,1) both;}@keyframes panelIn{from{opacity:0;transform:translateY(14px);filter:blur(6px);}to{opacity:1;transform:translateY(0);filter:blur(0);}}`}</style>
    </div>
  );
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────
function AdminPanel({orders, onClose}) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:4000,background:C.bg,overflowY:"auto"}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:40}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
          <Logo size={16}/>
          <button onClick={onClose} style={{padding:"8px 16px",background:C.surface,border:`1px solid ${C.border}`,color:C.ink2,fontFamily:mono,fontSize:10,letterSpacing:"0.14em",cursor:"pointer",borderRadius:R.sm}}>← Exit admin</button>
        </div>
        <div style={{fontSize:8,letterSpacing:"0.28em",color:C.muted,marginBottom:24,fontFamily:mono,textTransform:"uppercase"}}>Order backend — {orders.length} order{orders.length!==1?"s":""}</div>
        {orders.length===0
          ?<div style={{textAlign:"center",padding:"80px 0",color:C.muted,fontFamily:sans}}>No orders yet.</div>
          :orders.map((o,i)=>(
            <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:R.card,padding:24,marginBottom:14,boxShadow:"0 1px 8px rgba(26,28,30,0.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontFamily:serif,fontWeight:700,fontSize:15,color:C.ink}}>Order #{orders.length-i}</div>
                <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.14em"}}>{new Date(o.timestamp).toLocaleString("en-GB")}</div>
              </div>
              <pre style={{fontFamily:mono,fontSize:12,color:C.ink2,lineHeight:1.9,whiteSpace:"pre-wrap",background:C.surface2,padding:16,borderRadius:R.sm,border:`1px solid ${C.border}`}}>{o.summary}</pre>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked]         = useState(false);
  const [tab, setTab]                   = useState("kits");
  const [catFilter, setCatFilter]       = useState("All");
  const [cart, setCart]                 = useState([]);
  const [cartOpen, setCartOpen]         = useState(false);
  const [cartVisible, setCartVisible]   = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orders, setOrders]             = useState([]);
  const [adminOpen, setAdminOpen]       = useState(false);
  const [showAdmin, setShowAdmin]       = useState(false);
  const [adminInput, setAdminInput]     = useState("");
  const [successMsg, setSuccessMsg]     = useState(false);
  const [modalItem, setModalItem]       = useState(null);
  const catalogueRef = useRef(null);

  if (!unlocked) return <PasswordGate onUnlock={()=>setUnlocked(true)}/>;

  const scrollToCatalogue = () => {
    setTimeout(() => {
      const el = catalogueRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }, 60);
  };

  const handleTabClick = (id) => {
    setTab(id);
    setCatFilter("All");
    scrollToCatalogue();
  };

  const openCart = () => { setCartOpen(true); setTimeout(()=>setCartVisible(true),20); };
  const closeCart = () => { setCartVisible(false); setTimeout(()=>setCartOpen(false),340); };

  const cartIds   = cart.map(p=>p.name);
  const addToCart = item => { if(!cartIds.includes(item.name)) setCart(p=>[...p,item]); };
  const addStack  = stack => {
    const all   = [...KITS,...SINGLES];
    const toAdd = stack.peptides
      .map(n=>all.find(p=>p.name===n))
      .filter(p=>p&&!cartIds.includes(p.name))
      .map(p=>({...p, sellPrice:Math.round(p.sellPrice*0.85), stackDiscount:true}));
    setCart(p=>[...p,...toAdd]);
  };
  const handleSuccess = summary => {
    setOrders(p=>[{summary,timestamp:Date.now()},...p]);
    setCart([]); setCheckoutOpen(false);
    setSuccessMsg(true); setTimeout(()=>setSuccessMsg(false),5000);
  };

  const fKits    = catFilter==="All" ? KITS    : KITS.filter(p=>p.category===catFilter);
  const fSingles = catFilter==="All" ? SINGLES : SINGLES.filter(p=>p.category===catFilter);
  const fStacks  = catFilter==="All" ? STACKS  : STACKS.filter(s=>s.category===catFilter);

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:sans}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:C.bg}}/>

      {/* HEADER */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:500,background:"rgba(244,242,237,0.97)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,padding:"0 40px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo size={16}/>
        <TubelightNav tab={tab} onTabChange={handleTabClick}/>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setShowAdmin(!showAdmin)} style={{background:"none",border:"none",color:C.dim,cursor:"pointer",fontSize:14,padding:"4px 6px"}}>⚙</button>
          <button onClick={openCart} style={{padding:"8px 16px",background:cart.length>0?C.accentLt:C.surface,border:`1px solid ${cart.length>0?C.accentMd:C.border}`,color:cart.length>0?C.accent:C.ink2,fontFamily:sans,fontSize:13,fontWeight:500,cursor:"pointer",borderRadius:100,transition:"all 0.24s"}}>
            Order{cart.length>0?` (${cart.length})`:""}
          </button>
        </div>
      </header>

      {showAdmin&&(
        <div style={{position:"fixed",top:64,right:40,zIndex:200,background:C.surface,border:`1px solid ${C.borderMd}`,borderRadius:R.sm,padding:14,display:"flex",gap:8,boxShadow:"0 4px 20px rgba(26,28,30,0.12)"}}>
          <input type="password" placeholder="Admin code" value={adminInput} onChange={e=>setAdminInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&adminInput===ADMIN_PW){setAdminOpen(true);setShowAdmin(false);setAdminInput("");}}}
            style={{padding:"8px 12px",background:C.surface2,border:`1px solid ${C.border}`,borderRadius:R.sm,color:C.ink,fontFamily:mono,fontSize:11,outline:"none"}}/>
          <button onClick={()=>{if(adminInput===ADMIN_PW){setAdminOpen(true);setShowAdmin(false);setAdminInput("");}}} style={{padding:"8px 14px",background:C.accentLt,border:`1px solid ${C.accentMd}`,color:C.accent,fontFamily:mono,fontSize:10,cursor:"pointer",borderRadius:R.sm}}>→</button>
        </div>
      )}

      <div className="main-content" style={{position:"relative",zIndex:1,background:C.bg,paddingTop:64}}>
        {/* HERO */}
        <div style={{position:"relative",overflow:"hidden",borderBottom:`1px solid ${C.border}`,minHeight:520}}>
          <WaveCanvas/>
          <div style={{position:"absolute",inset:0,background:"rgba(244,242,237,0.72)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",pointerEvents:"none"}}/>
          <div className="hero-content" style={{position:"relative",zIndex:2,maxWidth:1200,margin:"0 auto",padding:"80px 40px 72px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:40}}>
            <div style={{borderLeft:`2px solid ${C.accent}`,paddingLeft:32,maxWidth:580}}>
              <div style={{fontSize:10,letterSpacing:"0.42em",color:C.accent,fontFamily:mono,marginBottom:20,textTransform:"uppercase"}}>
                Research Compounds · EU Compliant
              </div>
              <h1 style={{fontFamily:serif,fontWeight:700,fontSize:"clamp(38px,5vw,72px)",lineHeight:1.06,color:C.ink,margin:0}}>
                Premium Peptide<br/>Research Compounds<br/><em style={{color:C.accent,fontStyle:"italic"}}>for Europe.</em>
              </h1>
              <div style={{display:"flex",alignItems:"center",gap:10,margin:"22px 0",opacity:0.5}}>
                <div style={{flex:1,height:1,background:C.accentMd}}/>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="1" y="1" width="6" height="6" stroke={C.accent} strokeWidth="0.9" transform="rotate(45 4 4)"/></svg>
                <div style={{flex:1,height:1,background:C.accentMd}}/>
              </div>
              <p style={{color:C.ink2,lineHeight:1.95,fontSize:16,marginBottom:26,fontFamily:sans}}>
                Pharmaceutical-grade research peptides for serious scientific protocols. Available as kits or individual vials, with EU-wide delivery. Strictly for in-vitro and laboratory use only.
              </p>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 14px",background:"#FDF5F4",border:"1px solid #d4a59a",borderRadius:R.xs,fontSize:10,color:C.red,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.14em"}}>
                ⚠ Not for human use · Research purposes only · 18+
              </div>
              <div className="hero-stats-mobile" style={{display:"none",borderTop:`1px solid ${C.border}`,marginTop:16,paddingTop:14,gap:0}}>
                {[["15","Kits"],["07","Singles"],["04","Protocols"],["EU","Delivery"]].map(([n,l],i,arr)=>(
                  <div key={l} style={{flex:1,textAlign:"center",paddingTop:2,borderRight:i<arr.length-1?`1px solid ${C.border}`:"none"}}>
                    <div style={{fontFamily:serif,fontSize:20,fontWeight:700,color:C.ink,lineHeight:1}}>{n}</div>
                    <div style={{fontSize:7,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.14em",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{flexShrink:0,borderLeft:`1px solid ${C.border}`,paddingLeft:52,minWidth:280}}>
              <AnimatedStats/>
            </div>
          </div>
        </div>

        {/* FEATURED SELECTION */}
        <ScrollTiltSection>
          <FeaturedSection onOpenModal={setModalItem} cartIds={cartIds}/>
        </ScrollTiltSection>

        {/* FILTER BAR — catalogue anchor */}
        <div ref={catalogueRef} style={{borderBottom:`1px solid ${C.border}`,background:C.surface,padding:"0 40px",position:"sticky",top:64,zIndex:90}}>
          <div className="filter-bar" style={{maxWidth:1200,margin:"0 auto",display:"flex",gap:0,overflowX:"auto",whiteSpace:"nowrap",scrollbarWidth:"none"}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"14px 18px",background:"transparent",border:"none",borderBottom:`2px solid ${catFilter===c?(CAT[c]||C.accent):"transparent"}`,color:catFilter===c?(CAT[c]||C.accent):C.muted,fontFamily:mono,fontSize:10,letterSpacing:"0.16em",cursor:"pointer",transition:"all 0.24s",textTransform:"uppercase",flexShrink:0}}>{c}</button>
            ))}
          </div>
        </div>

        {/* ANIMATED CATALOGUE CONTENT */}
        <div key={tab} className="tab-enter">

        {/* KITS */}
        {tab==="kits"&&(
          <div style={{background:C.bg,minHeight:"60vh"}}>
          <ScrollTiltSection>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 40px 64px"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:26}}>
              <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,color:C.ink}}>Research Kits</h2>
              <span style={{fontSize:11,color:C.muted,fontFamily:mono}}>10 vials per kit · best value · click any card for full details</span>
            </div>
            <div key={catFilter} className="filter-enter catalogue-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(308px,1fr))",gap:14,alignItems:"stretch"}}>
              {fKits.map((p,i)=><ScrollRevealItem key={p.id} index={i}><KitCard item={p} onAdd={addToCart} inCart={cartIds.includes(p.name)} onOpenModal={setModalItem}/></ScrollRevealItem>)}
            </div>
          </div>
          </ScrollTiltSection>
          </div>
        )}

        {/* SINGLES */}
        {tab==="singles"&&(
          <div style={{background:C.bg,minHeight:"60vh"}}>
          <ScrollTiltSection>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 40px 64px"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:26}}>
              <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,color:C.ink}}>Single Vials</h2>
              <span style={{fontSize:11,color:C.muted,fontFamily:mono}}>individual compounds · click any row for full details</span>
            </div>
            <div key={catFilter} className="filter-enter" style={{display:"flex",flexDirection:"column",gap:10}}>
              {fSingles.map((p,i)=><ScrollRevealItem key={p.id} index={i}><SingleRow item={p} onAdd={addToCart} inCart={cartIds.includes(p.name)} onOpenModal={setModalItem}/></ScrollRevealItem>)}
            </div>
            <div style={{height:1,background:C.border,margin:"36px 0"}}/>
            <h2 style={{fontFamily:serif,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>Tablets</h2>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {TABLETS.map(p=><SingleRow key={p.id} item={p} onAdd={addToCart} inCart={cartIds.includes(p.name)} onOpenModal={setModalItem}/>)}
            </div>
          </div>
          </ScrollTiltSection>
          </div>
        )}

        {/* STACKS */}
        {tab==="stacks"&&(
          <div style={{background:C.bg,minHeight:"60vh"}}>
          <ScrollTiltSection>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 40px 64px"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:26}}>
              <h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,color:C.ink}}>Research Protocols</h2>
              <span style={{fontSize:11,color:C.muted,fontFamily:mono}}>curated combinations · 15% bundle discount</span>
            </div>
            <div key={catFilter} className="filter-enter catalogue-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:16}}>
              {fStacks.map((s,i)=><ScrollRevealItem key={s.name} index={i}><StackCard stack={s} onAddStack={addStack} cartIds={cartIds}/></ScrollRevealItem>)}
            </div>
          </div>
          </ScrollTiltSection>
          </div>
        )}

        </div>{/* end animated catalogue content */}

        {/* FOOTER */}
        <footer style={{borderTop:`1px solid ${C.border}`,background:C.surface,padding:"28px 40px",textAlign:"center"}}>
          <Logo size={13}/>
          <p style={{fontSize:9,color:C.dim,lineHeight:2,maxWidth:600,margin:"14px auto 0",fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>
            All products sold by Vantagen are intended for laboratory and in-vitro research only. Not for human or veterinary use. 18+ only. Compliant with applicable EU regulations. © 2025 Vantagen.
          </p>
        </footer>
      </div>

      {/* PRODUCT MODAL */}
      {modalItem && <ProductModal item={modalItem} onClose={()=>setModalItem(null)} onAdd={addToCart} cartIds={cartIds}/>}

      {/* CART */}
      {cartOpen&&<CartDrawer cart={cart} onRemove={i=>setCart(p=>p.filter((_,j)=>j!==i))} onClose={closeCart} onCheckout={()=>{closeCart();setTimeout(()=>setCheckoutOpen(true),360);}} visible={cartVisible}/>}

      {/* CHECKOUT */}
      {checkoutOpen&&<CheckoutModal cart={cart} onClose={()=>setCheckoutOpen(false)} onSuccess={handleSuccess}/>}

      {/* ADMIN */}
      {adminOpen&&<AdminPanel orders={orders} onClose={()=>setAdminOpen(false)}/>}

      {/* MOBILE BOTTOM NAV */}
      <div className="mobile-bottom-bar" style={{display:"none",position:"fixed",bottom:0,left:0,right:0,zIndex:500,background:"rgba(255,255,255,0.96)",borderTop:`1px solid ${C.border}`,height:68,alignItems:"stretch",justifyContent:"space-around",padding:"0"}}>
        {[
          {id:"kits",label:"Kits",icon:<svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="6" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6V5a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.4"/><line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>},
          {id:"singles",label:"Singles",icon:<svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><line x1="10" y1="6" x2="10" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>},
          {id:"stacks",label:"Stacks",icon:<svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="13" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="5" y="8.5" width="10" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="7" y="4" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>},
        ].map(({id,label,icon})=>(
          <button key={id} onClick={()=>handleTabClick(id)} style={{flex:1,background:"none",border:"none",borderTop:tab===id?`2px solid ${C.accent}`:"2px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,cursor:"pointer",color:tab===id?C.accent:C.muted,transition:"all 0.2s",padding:0}}>
            {icon}
            <span style={{fontSize:9,fontFamily:mono,letterSpacing:"0.08em",textTransform:"uppercase"}}>{label}</span>
          </button>
        ))}
        <button onClick={openCart} style={{flex:1,background:"none",border:"none",borderTop:cart.length>0?`2px solid ${C.accent}`:"2px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,cursor:"pointer",color:cart.length>0?C.accent:C.muted,transition:"all 0.2s",padding:0,position:"relative"}}>
          {cart.length>0&&<div style={{position:"absolute",top:8,right:"calc(50% - 16px)",width:16,height:16,background:C.accent,borderRadius:"50%",fontSize:9,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontFamily:mono}}>{cart.length}</div>}
          <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M3 4h2l2.5 8h7l2-5H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="15.5" r="1.2" fill="currentColor"/><circle cx="14" cy="15.5" r="1.2" fill="currentColor"/></svg>
          <span style={{fontSize:9,fontFamily:mono,letterSpacing:"0.08em",textTransform:"uppercase"}}>{cart.length>0?`(${cart.length})`:"Order"}</span>
        </button>
      </div>

      {/* SUCCESS */}
      {successMsg&&(
        <div className="success-toast" style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:C.surface,border:`1px solid ${C.accentMd}`,padding:"16px 28px",borderRadius:R.card,zIndex:4000,fontFamily:sans,fontSize:13,color:C.ink,textAlign:"center",lineHeight:1.8,boxShadow:"0 8px 40px rgba(26,28,30,0.18)"}}>
          <span style={{color:C.accent,fontWeight:700}}>✓ Order received</span><br/>
          <span style={{color:C.muted,fontSize:12}}>Check your email — we confirm within 24 hours.</span>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&family=Courier+Prime:wght@400;700&display=swap');
        html,body,#root{margin:0;padding:0;overflow-x:hidden;}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.borderMd};border-radius:2px;}

        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}

        @keyframes fadeIn{
          from{opacity:0}
          to{opacity:1}
        }
        @keyframes scaleIn{
          from{opacity:0;transform:scale(0.94) translateY(12px)}
          to{opacity:1;transform:scale(1) translateY(0)}
        }
        @keyframes slideUp{
          from{opacity:0;transform:translateY(20px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes slideInRight{
          from{transform:translateX(100%)}
          to{transform:translateX(0)}
        }

        .tab-enter{
          animation: slideUp 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .filter-enter{
          animation: filterSwitch 0.52s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes filterSwitch{
          from{opacity:0;transform:translateY(16px);filter:blur(4px)}
          to{opacity:1;transform:translateY(0);filter:blur(0)}
        }

        button{transition:all 0.22s ease;}
        button:active{transform:scale(0.97);}

        input:focus{outline:none;}

        @keyframes successPop{
          0%{opacity:0;transform:translateX(-50%) translateY(16px) scale(0.95)}
          60%{transform:translateX(-50%) translateY(-3px) scale(1.02)}
          100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
        }
        .success-toast{
          animation: successPop 0.44s cubic-bezier(0.22,1,0.36,1) both;
        }

        @media (max-width: 768px) {
          header { padding: 0 16px !important; height: 52px !important; }
          header > div:nth-child(2) { display: none !important; }
          .mobile-bottom-bar { display: flex !important; }

          .main-content { padding-top: 52px !important; padding-bottom: 80px !important; }

          .hero-content {
            flex-direction: column !important;
            padding: 24px 18px 20px !important;
            gap: 0 !important;
          }
          .hero-content > div:first-child {
            border-left: 2px solid #2C5F54 !important;
            padding-left: 16px !important;
            max-width: 100% !important;
          }
          .hero-content > div:last-child { display: none !important; }
          .hero-stats-mobile { display: flex !important; }

          .hero-content h1 { font-size: clamp(26px, 7vw, 36px) !important; }
          .hero-content p { font-size: 13px !important; }

          .featured-grid {
            grid-template-columns: repeat(5, 200px) !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
          }

          .catalogue-grid { grid-template-columns: 1fr !important; }

          .filter-bar { overflow-x: auto !important; white-space: nowrap !important; -webkit-overflow-scrolling: touch !important; }
          div[style*="padding:\"0 40px\""], .filter-bar-wrap { padding: 0 !important; }

          .catalogue-grid .card-padding { padding: 16px !important; }

          .cart-drawer {
            width: 100% !important;
            max-height: 85vh !important;
            top: auto !important;
            border-left: none !important;
            border-top: 1px solid #E2DFD9 !important;
            border-radius: 16px 16px 0 0 !important;
          }

          .modal-panel {
            max-width: 100% !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            margin: 0 !important;
            height: 100dvh !important;
          }
          .checkout-panel {
            max-width: 100% !important;
            border-radius: 0 !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
          }

          div[style*="maxWidth:1200"] { padding-left: 16px !important; padding-right: 16px !important; }

          div[style*="72px 40px 68px"] { padding: 40px 16px 36px !important; }

          footer { padding: 24px 16px 90px !important; }
        }
      `}</style>
    </div>
  );
}
