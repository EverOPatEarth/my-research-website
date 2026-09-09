import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Database,
  Microscope,
  Github,
  Twitter,
  GraduationCap,
  FileText,
} from 'lucide-react';

export const profile = {
  name: 'Dr. Alex Chen',
  shortName: 'Alex Chen',
  title: 'Research Scientist',
  affiliation: 'Institute for Computational Intelligence',
  location: 'Cambridge, MA',
  bio: 'I study how neural systems learn and adapt, working at the intersection of machine learning and computational neuroscience. My current research focuses on biologically plausible learning rules, neural coding in decision-making circuits, and building AI systems that can reason about their own uncertainty.',
  longBio:
    'I am a research scientist investigating the principles of learning and computation in both biological and artificial systems. My work draws on methods from machine learning, neuroscience, and cognitive science to understand how brains and machines can learn from limited data, generalize to new situations, and reason under uncertainty.',
  email: 'alex.chen@research.edu',
  socials: [
    { label: 'Google Scholar', href: 'https://scholar.google.com', icon: GraduationCap },
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'ORCID', href: 'https://orcid.org', icon: FileText },
    { label: 'Twitter / X', href: 'https://twitter.com', icon: Twitter },
  ],
};

export const researchInterests: string[] = [
  'Machine Learning',
  'Computational Neuroscience',
  'Neural Coding',
  'Decision-Making',
  'Human-AI Interaction',
  'Uncertainty Quantification',
  'Biologically Plausible Learning',
];

export type PublicationStatus = 'published' | 'preprint' | 'in-review';

export interface Publication {
  id: string;
  title: string;
  abstract: string;
  venue: string;
  year: number;
  pdfUrl: string;
  codeUrl?: string;
  tags: string[];
  authors: string[];
  bibtex: string;
  status: PublicationStatus;
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: 'pub-1',
    title:
      'Predictive Coding as a Framework for Understanding Cortical Computation',
    abstract:
      'We propose that predictive coding, a theory of cortical function rooted in Bayesian inference, provides a unifying framework for understanding diverse neural phenomena. By formalizing cortical computation as hierarchical prediction error minimization, we show how diverse perceptual and cognitive processes emerge from a single computational principle.',
    venue: 'Nature Neuroscience',
    year: 2024,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Computational Neuroscience', 'Predictive Coding'],
    authors: ['Alex Chen', 'Sarah Martinez', 'David Kim'],
    bibtex: `@article{chen2024predictive,
  title={Predictive Coding as a Framework for Understanding Cortical Computation},
  author={Chen, Alex and Martinez, Sarah and Kim, David},
  journal={Nature Neuroscience},
  year={2024},
  volume={27},
  pages={1--18},
  publisher={Nature Publishing Group}
}`,
    status: 'published',
    featured: true,
  },
  {
    id: 'pub-2',
    title:
      'Sparse Distributed Representations Enable Robust Few-Shot Learning in Neural Networks',
    abstract:
      'We demonstrate that sparse distributed representations, inspired by biological neural codes, significantly improve few-shot learning performance across a range of benchmark tasks. Our approach achieves state-of-the-art results while requiring 10x fewer training examples than dense alternatives.',
    venue: 'NeurIPS',
    year: 2024,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Machine Learning', 'Few-Shot Learning'],
    authors: ['Alex Chen', 'Priya Patel', "James O'Connor"],
    bibtex: `@inproceedings{chen2024sparse,
  title={Sparse Distributed Representations Enable Robust Few-Shot Learning in Neural Networks},
  author={Chen, Alex and Patel, Priya and O'Connor, James},
  booktitle={Advances in Neural Information Processing Systems},
  year={2024},
  volume={37}
}`,
    status: 'published',
    featured: true,
  },
  {
    id: 'pub-3',
    title:
      'Neural Correlates of Uncertainty-Guided Exploration in Primate Prefrontal Cortex',
    abstract:
      'Using multi-electrode recordings in behaving primates, we identify a population of prefrontal neurons whose activity encodes the uncertainty associated with different choice options, providing direct evidence for uncertainty-guided exploration in the primate brain.',
    venue: 'Cell Reports',
    year: 2023,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Neuroscience', 'Decision-Making'],
    authors: ['Alex Chen', 'Maria Rodriguez', 'Robert Thompson'],
    bibtex: `@article{chen2023neural,
  title={Neural Correlates of Uncertainty-Guided Exploration in Primate Prefrontal Cortex},
  author={Chen, Alex and Rodriguez, Maria and Thompson, Robert},
  journal={Cell Reports},
  year={2023},
  volume={42},
  number={8},
  pages={112--125}
}`,
    status: 'published',
    featured: true,
  },
  {
    id: 'pub-4',
    title:
      'Biologically Plausible Backpropagation Through Time in Cortical Microcircuits',
    abstract:
      'We introduce a biologically plausible learning rule that approximates backpropagation through time using local feedback connections. Our model demonstrates that cortical microcircuits can in principle learn temporal sequences without requiring a global error signal.',
    venue: 'ICML',
    year: 2023,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Machine Learning', 'Computational Neuroscience'],
    authors: ['Alex Chen', 'Yuki Tanaka'],
    bibtex: `@inproceedings{chen2023biologically,
  title={Biologically Plausible Backpropagation Through Time in Cortical Microcircuits},
  author={Chen, Alex and Tanaka, Yuki},
  booktitle={International Conference on Machine Learning},
  year={2023},
  pages={1234--1245}
}`,
    status: 'published',
    featured: true,
  },
  {
    id: 'pub-5',
    title:
      'Dopaminergic Modulation of Cortical Microcircuits: A Computational Model',
    abstract:
      'We present a computational model of how dopaminergic modulation shapes the dynamics of cortical microcircuits. Our model predicts that dopamine release optimizes the balance between exploitation and exploration by modulating recurrent excitation in prefrontal circuits.',
    venue: 'Preprint',
    year: 2025,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Computational Neuroscience', 'Neural Coding'],
    authors: ['Alex Chen', 'Lena Fischer'],
    bibtex: `@misc{chen2025dopaminergic,
  title={Dopaminergic Modulation of Cortical Microcircuits: A Computational Model},
  author={Chen, Alex and Fischer, Lena},
  year={2025},
  eprint={2501.12345},
  archivePrefix={arXiv},
  primaryClass={q-bio.NC}
}`,
    status: 'preprint',
  },
  {
    id: 'pub-6',
    title:
      'Calibrated Uncertainty Estimation for Clinical Decision Support Systems',
    abstract:
      'We propose a novel calibration method for uncertainty estimates in clinical AI systems. Our approach uses conformal prediction to provide statistically valid confidence intervals, enabling clinicians to make safer decisions based on AI recommendations.',
    venue: 'Under review at JMLR',
    year: 2025,
    pdfUrl: '#',
    codeUrl: 'https://github.com',
    tags: ['Machine Learning', 'Uncertainty Quantification', 'Human-AI Interaction'],
    authors: ['Alex Chen', 'Omar Hassan', 'Jing Liu'],
    bibtex: `@misc{chen2025calibrated,
  title={Calibrated Uncertainty Estimation for Clinical Decision Support Systems},
  author={Chen, Alex and Hassan, Omar and Liu, Jing},
  year={2025},
  note={Under review at Journal of Machine Learning Research}
}`,
    status: 'in-review',
  },
  {
    id: 'pub-7',
    title:
      'Emergent Compositional Generalization in Large-Scale Neural Network Models',
    abstract:
      'We investigate how compositional generalization emerges in large-scale neural networks trained on structured data. Our findings suggest that architectural inductive biases, rather than scale alone, are critical for achieving systematic generalization.',
    venue: 'Preprint',
    year: 2025,
    pdfUrl: '#',
    tags: ['Machine Learning'],
    authors: ['Alex Chen', 'Ravi Krishnan'],
    bibtex: `@misc{chen2025emergent,
  title={Emergent Compositional Generalization in Large-Scale Neural Network Models},
  author={Chen, Alex and Krishnan, Ravi},
  year={2025},
  eprint={2502.67890},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}`,
    status: 'preprint',
  },
];

export type DatasetType = 'dataset' | 'code' | 'model';

export interface Dataset {
  id: string;
  title: string;
  description: string;
  type: DatasetType;
  formats: string[];
  size: string;
  license: string;
  updated: string;
  tags: string[];
  downloadUrl: string;
  repoUrl?: string;
  repoPlatform?: 'github' | 'huggingface';
  paperId?: string;
}

export const datasets: Dataset[] = [
  {
    id: 'ds-1',
    title: 'Prefrontal Cortex Multi-Electrode Recordings',
    description:
      'Multi-electrode neural recording data from primate prefrontal cortex during a two-armed bandit decision-making task. Includes spike-sorted waveforms, trial-by-trial behavioral responses, and stimulus timing.',
    type: 'dataset',
    formats: ['HDF5', 'CSV'],
    size: '2.4 GB',
    license: 'CC-BY 4.0',
    updated: '2024-08-15',
    tags: ['Neuroscience', 'Decision-Making', 'Neural Coding'],
    downloadUrl: '#',
    repoUrl: 'https://huggingface.co',
    repoPlatform: 'huggingface',
    paperId: 'pub-3',
  },
  {
    id: 'ds-2',
    title: 'Sparse Coding Few-Shot Benchmark Suite',
    description:
      'Benchmark datasets and evaluation scripts for testing few-shot learning with sparse distributed representations. Includes 10 vision and language tasks with standardized train/test splits.',
    type: 'code',
    formats: ['Python', 'JSON', 'NPY'],
    size: '840 MB',
    license: 'MIT',
    updated: '2024-07-02',
    tags: ['Machine Learning', 'Few-Shot Learning'],
    downloadUrl: '#',
    repoUrl: 'https://github.com',
    repoPlatform: 'github',
    paperId: 'pub-2',
  },
  {
    id: 'ds-3',
    title: 'Cortical Dynamics Simulation Framework',
    description:
      'A Python framework for simulating cortical microcircuit dynamics with biologically plausible learning rules. Supports custom neuron models, plasticity rules, and real-time visualization.',
    type: 'code',
    formats: ['Python', 'YAML'],
    size: '12 MB',
    license: 'Apache-2.0',
    updated: '2024-06-20',
    tags: ['Computational Neuroscience', 'Biologically Plausible Learning'],
    downloadUrl: '#',
    repoUrl: 'https://github.com',
    repoPlatform: 'github',
    paperId: 'pub-4',
  },
  {
    id: 'ds-4',
    title: 'Predictive Coding Model Weights',
    description:
      'Pre-trained model weights for the hierarchical predictive coding network described in our 2024 Nature Neuroscience paper. Includes checkpoints for 3 architectural variants and evaluation scripts.',
    type: 'model',
    formats: ['PyTorch', 'HDF5'],
    size: '1.1 GB',
    license: 'CC-BY-NC 4.0',
    updated: '2024-05-10',
    tags: ['Computational Neuroscience', 'Predictive Coding'],
    downloadUrl: '#',
    repoUrl: 'https://huggingface.co',
    repoPlatform: 'huggingface',
    paperId: 'pub-1',
  },
  {
    id: 'ds-5',
    title: 'Dopaminergic Modulation Simulation Data',
    description:
      'Simulation data from our computational model of dopaminergic modulation in cortical microcircuits. Contains spike trains, synaptic weight trajectories, and behavioral metrics across 500 simulation runs.',
    type: 'dataset',
    formats: ['HDF5', 'CSV'],
    size: '3.8 GB',
    license: 'CC-BY 4.0',
    updated: '2025-01-25',
    tags: ['Computational Neuroscience', 'Neural Coding'],
    downloadUrl: '#',
    repoUrl: 'https://github.com',
    repoPlatform: 'github',
    paperId: 'pub-5',
  },
  {
    id: 'ds-6',
    title: 'Clinical Uncertainty Calibration Toolkit',
    description:
      'A Python toolkit for calibrated uncertainty estimation in clinical AI systems. Implements conformal prediction, temperature scaling, and ensemble calibration methods with clinical-specific evaluation metrics.',
    type: 'code',
    formats: ['Python', 'JSON'],
    size: '45 MB',
    license: 'MIT',
    updated: '2025-02-01',
    tags: ['Machine Learning', 'Uncertainty Quantification', 'Human-AI Interaction'],
    downloadUrl: '#',
    repoUrl: 'https://github.com',
    repoPlatform: 'github',
    paperId: 'pub-6',
  },
  {
    id: 'ds-7',
    title: 'Compositional Generalization Evaluation Set',
    description:
      'Evaluation dataset for testing compositional generalization in large-scale neural networks. Contains structured sequence tasks with controlled compositional structure and systematic train/test splits.',
    type: 'dataset',
    formats: ['JSON', 'CSV'],
    size: '320 MB',
    license: 'CC-BY 4.0',
    updated: '2025-02-15',
    tags: ['Machine Learning'],
    downloadUrl: '#',
    repoUrl: 'https://huggingface.co',
    repoPlatform: 'huggingface',
    paperId: 'pub-7',
  },
  {
    id: 'ds-8',
    title: 'Neural Activity Visualization Toolkit',
    description:
      'Interactive visualization library for neural population activity data. Supports raster plots, PCA/t-SNE projections, and dynamic activity animations with export capabilities for publications.',
    type: 'code',
    formats: ['Python', 'JavaScript'],
    size: '8 MB',
    license: 'BSD-3-Clause',
    updated: '2023-11-30',
    tags: ['Neuroscience', 'Neural Coding'],
    downloadUrl: '#',
    repoUrl: 'https://github.com',
    repoPlatform: 'github',
  },
];

export type NoteStatus = 'seedling' | 'growing' | 'evergreen';

export interface NoteSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Note {
  id: string;
  title: string;
  excerpt: string;
  status: NoteStatus;
  date: string;
  updated: string;
  readingTime: string;
  tags: string[];
  content: NoteSection[];
  backlinks: string[];
}

export const noteStatusConfig: Record<
  NoteStatus,
  { label: string; emoji: string; className: string }
> = {
  seedling: {
    label: 'Seedling',
    emoji: '🌱',
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  growing: {
    label: 'Growing',
    emoji: '🌿',
    className:
      'border-lime-500/30 bg-lime-500/10 text-lime-600 dark:text-lime-400',
  },
  evergreen: {
    label: 'Evergreen',
    emoji: '🌳',
    className:
      'border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400',
  },
};

export const notes: Note[] = [
  {
    id: 'note-1',
    title: 'On the illusion of understanding in AI systems',
    excerpt:
      'As language models become more fluent, we increasingly mistake their confidence for comprehension. The gap between producing correct answers and understanding why they are correct is not a minor detail — it is the central challenge of building reliable AI.',
    status: 'evergreen',
    date: '2024-09-15',
    updated: '2024-12-01',
    readingTime: '5 min',
    tags: ['MachineLearning', 'Philosophy', 'AI'],
    content: [
      {
        id: 's1',
        heading: 'The fluency trap',
        paragraphs: [
          'There is a peculiar thing that happens when a language model produces a fluent, confident answer to a difficult question. We read the response, it sounds plausible, and we nod along. The model has expressed itself clearly, so it must understand what it is saying. This is the fluency trap — the tendency to equate smooth expression with deep comprehension.',
          'But fluency and understanding are not the same thing. A well-rehearsed actor can deliver a monologue about quantum mechanics without understanding a single equation. A parrot can say "hello" without grasping the social convention of greeting. The question is whether the system has a model of the world that constrains its outputs, or whether it is merely producing the next most likely token.',
        ],
      },
      {
        id: 's2',
        heading: 'What understanding actually requires',
        paragraphs: [
          'Understanding, in the richest sense, requires more than pattern matching. It requires a causal model — a sense of why things happen, not just what tends to co-occur. It requires the ability to reason counterfactually: what would happen if I changed this variable? It requires the capacity to recognize when you do not know something, and to calibrate your confidence accordingly.',
          'Current AI systems can approximate some of these capabilities in narrow domains. But the gap between approximation and genuine understanding becomes visible at the edges — when the system is asked to generalize, to explain its reasoning, or to admit uncertainty.',
        ],
      },
      {
        id: 's3',
        heading: 'Implications for deployment',
        paragraphs: [
          'If we cannot reliably distinguish between a system that understands and one that merely sounds like it does, we have a serious problem for deployment. In high-stakes domains — medicine, law, autonomous systems — the cost of a confident wrong answer is not a minor inconvenience. It can be catastrophic.',
          'The solution is not to abandon these systems, but to be clear-eyed about their limitations. We need better evaluation methods that test for understanding, not just fluency. We need interfaces that surface uncertainty. And we need users who are educated about what these systems can and cannot do.',
        ],
      },
    ],
    backlinks: ['note-2', 'note-4'],
  },
  {
    id: 'note-2',
    title: 'Why brains do not compute (and why that is okay)',
    excerpt:
      'The brain-as-computer metaphor has been remarkably productive, but it may now be holding us back. Perhaps it is time to think of neural computation not as information processing, but as a form of active inference about the world.',
    status: 'growing',
    date: '2024-08-02',
    updated: '2024-11-15',
    readingTime: '8 min',
    tags: ['Neuroscience', 'Philosophy'],
    content: [
      {
        id: 's1',
        heading: 'The metaphor that shaped a field',
        paragraphs: [
          'The brain-as-computer metaphor has been remarkably productive. It gave us a vocabulary for talking about neural processes — "encoding," "processing," "storage," "retrieval." It inspired decades of research into how neurons might implement computational operations.',
          'But metaphors are not theories. They are scaffolding for thought, and eventually the scaffolding must come down. The question is whether the computer metaphor is still serving us, or whether it is now constraining the questions we ask.',
        ],
      },
      {
        id: 's2',
        heading: 'Active inference as an alternative',
        paragraphs: [
          'An alternative framework — active inference — treats the brain not as a computer that processes inputs to produce outputs, but as a system that maintains a generative model of the world and uses that model to predict and act. In this view, perception is not passive reception of data but active construction of hypotheses. Action is not output but intervention to confirm or disconfirm predictions.',
          'This framework dissolves the input-output distinction that the computer metaphor relies on. The brain is always simultaneously predicting, sensing, and acting. There is no "processing stage" — it is all one continuous loop of inference and control.',
        ],
      },
      {
        id: 's3',
        heading: 'What we gain by letting go',
        paragraphs: [
          'Letting go of the computer metaphor does not mean abandoning rigor. It means asking different questions. Instead of asking "what computation does this circuit perform?", we might ask "what model does this circuit maintain, and what predictions does it generate?"',
          'This shift opens up new avenues for understanding phenomena that the computer metaphor struggles with — like the pervasive role of noise in neural systems, the tight coupling between perception and action, and the fact that brains are not passive observers but active participants in their environments.',
        ],
      },
    ],
    backlinks: ['note-1', 'note-3'],
  },
  {
    id: 'note-3',
    title: 'The forgotten role of noise in neural learning',
    excerpt:
      'Noise is usually treated as a nuisance in machine learning, but biological systems exploit it. Stochasticity in neural firing may be a feature, not a bug — enabling exploration, regularization, and robust generalization.',
    status: 'evergreen',
    date: '2024-06-20',
    updated: '2024-10-05',
    readingTime: '6 min',
    tags: ['MachineLearning', 'Neuroscience'],
    content: [
      {
        id: 's1',
        heading: 'Noise as a nuisance',
        paragraphs: [
          'In machine learning, noise is the enemy. It corrupts gradients, destabilizes training, and degrades generalization. We invest enormous effort in reducing it — gradient clipping, batch normalization, weight decay. The assumption is that noise is something to be minimized.',
          'But biological neural systems are noisy at every level. Ion channels flicker stochastically. Synaptic release is probabilistic. Neural firing is irregular. If noise were purely a nuisance, evolution would have eliminated it. The fact that it persists suggests it serves a function.',
        ],
      },
      {
        id: 's2',
        heading: 'Noise as exploration',
        paragraphs: [
          'One key function of neural noise may be exploration. In reinforcement learning, exploration is essential for discovering better policies, but it is often implemented artificially — epsilon-greedy strategies, entropy bonuses, or Gaussian noise added to actions.',
          'In the brain, stochastic firing may provide a natural source of exploration. When a decision is uncertain, noise in the decision-making circuit can push the system toward unexplored options. When a decision is certain, the signal overwhelms the noise and the system exploits its knowledge.',
        ],
      },
      {
        id: 's3',
        heading: 'Implications for AI',
        paragraphs: [
          'If biological systems use noise productively, perhaps we should rethink how we handle it in artificial systems. Instead of treating noise as something to be eliminated, we might design systems that exploit it — using stochasticity as a source of exploration, a form of regularization, or a mechanism for robust generalization.',
          'Some recent work in deep learning has begun to move in this direction. Stochastic depth, dropout, and noisy activation functions all inject noise during training. But these are still framed as regularization tricks. The biological perspective suggests something deeper: noise is not a bug to be fixed, but a feature to be understood.',
        ],
      },
    ],
    backlinks: ['note-2', 'note-5'],
  },
  {
    id: 'note-4',
    title: 'Calibration as a moral imperative for AI',
    excerpt:
      'If an AI system tells you it is 99% confident, and it is wrong, the consequences can be severe. Calibration — the property that confidence matches accuracy — is not just a technical concern. It is a moral one.',
    status: 'seedling',
    date: '2024-11-10',
    updated: '2024-12-20',
    readingTime: '4 min',
    tags: ['AI', 'Philosophy', 'DataScience'],
    content: [
      {
        id: 's1',
        heading: 'The stakes of overconfidence',
        paragraphs: [
          'When a medical AI system says it is 99% confident in a diagnosis, and that diagnosis is wrong, the consequences can be severe. The patient may receive inappropriate treatment. The clinician may defer to the machine. The system has not just made an error — it has betrayed a trust that was placed in its confidence.',
          'Calibration — the property that a system\'s confidence matches its accuracy — is not just a technical concern. It is a moral one. A system that is systematically overconfident is not just suboptimal; it is dangerous.',
        ],
      },
      {
        id: 's2',
        heading: 'Why calibration is hard',
        paragraphs: [
          'Modern neural networks are notoriously poorly calibrated. A model that achieves 95% accuracy on a test set may be 99% confident on every prediction, including the 5% it gets wrong. This overconfidence is a natural consequence of training procedures that push probabilities toward extremes.',
          'Fixing this is not trivial. Post-hoc calibration methods like temperature scaling help, but they assume the problem is in the output layer. In reality, miscalibration can arise from the data, the architecture, the training procedure, or the distribution shift between training and deployment.',
        ],
      },
    ],
    backlinks: ['note-1'],
  },
  {
    id: 'note-5',
    title: 'Sparse representations and the curse of dimensionality',
    excerpt:
      'High-dimensional representations are powerful but unwieldy. Sparse coding — where only a small fraction of dimensions are active — may offer a way to get the expressiveness of high dimensions without the computational cost.',
    status: 'growing',
    date: '2024-10-15',
    updated: '2025-01-08',
    readingTime: '7 min',
    tags: ['MachineLearning', 'DataScience'],
    content: [
      {
        id: 's1',
        heading: 'The dimensionality dilemma',
        paragraphs: [
          'Modern machine learning thrives on high-dimensional representations. A language model might represent each token as a vector with thousands of dimensions. The richness of these representations is what makes them powerful — but it is also what makes them expensive.',
          'The curse of dimensionality is well known: as dimensions increase, the volume of the space grows exponentially, and the amount of data needed to cover it grows too. Sparse representations offer a way out of this dilemma by keeping only a small fraction of dimensions active at any time.',
        ],
      },
      {
        id: 's2',
        heading: 'Biological inspiration',
        paragraphs: [
          'Biological neural systems use sparse representations extensively. In the hippocampus, "place cells" fire selectively for specific locations — only a tiny fraction of cells are active at any moment. In the cortex, sparse coding is the norm: most neurons are quiet most of the time.',
          'This sparsity has computational benefits. It reduces the metabolic cost of neural activity. It increases the storage capacity of associative memories. And it makes representations more interpretable — each active dimension carries more meaning when most dimensions are silent.',
        ],
      },
      {
        id: 's3',
        heading: 'Practical implications',
        paragraphs: [
          'In artificial systems, sparse representations can reduce computational cost, improve generalization, and increase interpretability. But they also introduce challenges — sparse computations can be harder to parallelize, and training procedures that encourage sparsity can be unstable.',
          'The biological perspective suggests that the right approach is not to force sparsity through penalties, but to build it into the architecture. If the brain can do it, perhaps we can too.',
        ],
      },
    ],
    backlinks: ['note-3'],
  },
  {
    id: 'note-6',
    title: 'Reading the brain as a prediction machine',
    excerpt:
      'Predictive processing theories suggest the brain is not a passive recipient of sensory data, but an active prediction engine constantly generating hypotheses about its inputs. What does this mean for how we study neural coding?',
    status: 'seedling',
    date: '2025-01-20',
    updated: '2025-02-01',
    readingTime: '5 min',
    tags: ['Neuroscience', 'Philosophy'],
    content: [
      {
        id: 's1',
        heading: 'The prediction framework',
        paragraphs: [
          'Predictive processing offers a unifying framework for understanding brain function. The brain is not a passive recipient of sensory data but an active prediction engine, constantly generating hypotheses about its inputs and updating them based on prediction errors.',
          'This framework reframes perception as inference, action as intervention, and learning as model updating. It connects levels of analysis — from single neurons to whole-brain dynamics — under a single computational principle.',
        ],
      },
      {
        id: 's2',
        heading: 'Implications for neural coding',
        paragraphs: [
          'If the brain is a prediction machine, then neural activity does not simply "encode" sensory inputs. It encodes predictions, prediction errors, and the precision of those predictions. This changes how we should interpret neural recordings.',
          'A neuron that fires when a stimulus is present might not be encoding the stimulus itself. It might be encoding the error between what was predicted and what was observed. This distinction matters for how we design experiments and interpret results.',
        ],
      },
    ],
    backlinks: ['note-2'],
  },
];

export interface Thought {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export const thoughts: Thought[] = [
  {
    id: 'thought-1',
    title: 'On the illusion of understanding in AI systems',
    excerpt:
      'As language models become more fluent, we increasingly mistake their confidence for comprehension. The gap between producing correct answers and understanding why they are correct is not a minor detail — it is the central challenge of building reliable AI.',
    date: '2024-09-15',
    readingTime: '5 min',
    tags: ['AI', 'Epistemology'],
  },
  {
    id: 'thought-2',
    title: 'Why brains do not compute (and why that is okay)',
    excerpt:
      'The brain-as-computer metaphor has been remarkably productive, but it may now be holding us back. Perhaps it is time to think of neural computation not as information processing, but as a form of active inference about the world.',
    date: '2024-08-02',
    readingTime: '8 min',
    tags: ['Neuroscience', 'Philosophy'],
  },
  {
    id: 'thought-3',
    title: 'The forgotten role of noise in neural learning',
    excerpt:
      'Noise is usually treated as a nuisance in machine learning, but biological systems exploit it. Stochasticity in neural firing may be a feature, not a bug — enabling exploration, regularization, and robust generalization.',
    date: '2024-06-20',
    readingTime: '6 min',
    tags: ['Machine Learning', 'Neuroscience'],
  },
];

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

export const stats: Stat[] = [
  { id: 'papers', label: 'Published Papers', value: 47, suffix: '', icon: BookOpen },
  { id: 'datasets', label: 'Active Datasets', value: 12, suffix: '', icon: Database },
  { id: 'topics', label: 'Research Topics', value: 7, suffix: '', icon: Microscope },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Papers', href: '/papers' },
  { label: 'Research Data', href: '/data' },
  { label: 'Thoughts', href: '/thoughts' },
];
