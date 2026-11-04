// Single source of truth for build-time SEO/GEO output (static HTML, JSON-LD, sitemap).
// Metadata taken from Crossref / PubMed records. Do not add numbers not stated in the papers.
export const SITE = 'https://yonghaoz.com'

export const person = {
  name: 'Yonghao Zhao',
  description:
    'Yonghao Zhao is a Ph.D. student in Computational Bioscience at the University of Colorado Anschutz Medical Campus, working on deep learning for multimodal genomics, survival analysis, and representation learning. He is the first author of YeastSAM (Molecular Biology of the Cell, 2026), DeSCENT (Bioinformatics, 2026), and a transfer-learning survival analysis study (Artificial Intelligence in Medicine, 2026).',
  jobTitle: 'Ph.D. Student, Computational Bioscience',
  affiliation: 'University of Colorado Anschutz Medical Campus',
  alumniOf: ['Brown University', 'University of Leeds', 'Southwest Jiaotong University'],
  knowsAbout: ['multimodal genomics', 'cancer survival analysis', 'representation learning', 'single-cell RNA-seq', 'cell segmentation', 'transfer learning'],
  email: 'yonghao.zhao@cuanschutz.edu',
  sameAs: [
    'https://orcid.org/0009-0007-3180-596X',
    'https://openalex.org/A5121234063',
    'https://scholar.google.com/citations?user=CkujI4gAAAAJ',
    'https://github.com/YonghaoZhao722',
    'https://www.linkedin.com/in/yonghao-zhao-261329377/',
  ],
}

export const papers = [
  {
    slug: 'descent',
    short: 'DeSCENT',
    title: 'DeSCENT: Deconvolutional Single-Cell RNA-seq Enhances Transcriptome-based Cancer Survival Analysis',
    authors: ['Yonghao Zhao', 'Zeyu You', 'Yu Shen', 'Jielei Chu', 'Xun Gong', 'Tianrui Li', 'Ziqiang Wang', 'Chuan Xu', 'Zhipeng Luo', 'Yazhou He'],
    venue: 'Bioinformatics',
    year: '2026',
    date: '2026/03/18',
    // Available version: bioRxiv preprint
    doi: '10.64898/2026.03.15.711877',
    publisher: 'bioRxiv',
    isPreprint: true,
    url: 'https://www.biorxiv.org/content/10.64898/2026.03.15.711877v1.abstract',
    code: 'https://github.com/YonghaoZhao722/DeSCENT',
    image: '/descent-source-16x9.svg',
    abstract: [
      ['Motivation', 'Accurate cancer survival prediction requires modeling tumor heterogeneity across both population and cell levels. Most cancer survival analyses use tumor transcriptomes only, since cohorts are usually measured with bulk RNA-seq but are rarely recorded with single-cell RNA-seq. This prevents the direct use of cell-level transcriptomes in cancer survival analysis.'],
      ['Results', 'To bridge this gap, we propose using bulk RNA-seq deconvolution algorithms to reconstruct each subject’s scRNA-seq profile from their bulk data. Then, by combining both scRNA-seq and bulk RNA-seq together with their survival labels (paired to bulk), we perform multimodal transcriptome-based survival analysis. We built this framework as DeSCENT and evaluated it with common survival models on eight TCGA cancer cohorts. Results showed notable and consistent improvements in C-index over bulk-only models or models using cellular information alone.'],
    ],
    tldr: 'DeSCENT reconstructs each patient’s single-cell RNA-seq profile from bulk RNA-seq by deconvolution, then combines bulk and reconstructed single-cell transcriptomes for multimodal cancer survival prediction.',
    keyResults: [
      'Evaluated with common survival models (Cox, DeepSurv, DeepHit) on eight TCGA cancer cohorts.',
      'Notable and consistent improvements in C-index over bulk-only models or models using cellular information alone.',
    ],
    faq: [
      ['What problem does DeSCENT solve?', 'Cancer cohorts with survival labels are usually profiled with bulk RNA-seq, not single-cell RNA-seq, so cell-level transcriptomes cannot be used directly for survival analysis. DeSCENT reconstructs subject-level scRNA-seq from bulk data so both can be used.'],
      ['Which data was it evaluated on?', 'Eight TCGA cancer cohorts.'],
      ['Is the code available?', 'Yes: https://github.com/YonghaoZhao722/DeSCENT'],
      ['Who is the first author?', 'Yonghao Zhao.'],
    ],
  },
  {
    slug: 'yeastsam',
    short: 'YeastSAM',
    title: 'YeastSAM: A deep learning model for accurate segmentation of yeast cells',
    authors: ['Yonghao Zhao', 'Zhouyuan Zhu', 'Sen Yang', 'Weihan Li'],
    venue: 'Molecular Biology of the Cell',
    year: '2026',
    date: '2026/06/01',
    volume: '37', issue: '6', article: 'mr5',
    doi: '10.1091/mbc.E25-09-0454',
    publisher: 'American Society for Cell Biology',
    url: 'https://www.molbiolcell.org/doi/10.1091/mbc.E25-09-0454',
    code: 'https://github.com/YonghaoZhao722/YeastSAM',
    docs: 'https://yeastsamdoc.readthedocs.io/en/latest/',
    image: '/yeast-mascot-banner.svg',
    abstract: [
      [null, 'Cell segmentation—the process of defining cell outlines in microscopy images—is essential for quantitative image analysis. Segmentation of budding yeast is challenging due to its asymmetric cell division and mother-bud morphology. Consequently, dividing cells are frequently misidentified as two separate cells, causing errors in downstream analysis. Here, we addressed this challenge by adapting the Segment Anything Model (SAM) to construct YeastSAM, a deep learning-based segmentation framework optimized for budding yeast. YeastSAM achieved more than three-fold higher accuracy in segmenting dividing cells compared with existing methods. When combined with single-molecule RNA imaging and organelle imaging, YeastSAM can be incorporated into a computational pipeline to build cellular maps. This enables quantitative analysis of the spatial regulation of gene expression. This study offers an accessible model for yeast cell segmentation, empowering researchers with minimal programming experience to perform quantitative image analysis.'],
    ],
    tldr: 'YeastSAM adapts the Segment Anything Model (SAM) to budding yeast, so dividing mother-bud cells are segmented correctly instead of being split into two cells.',
    keyResults: [
      'More than three-fold higher accuracy in segmenting dividing cells compared with existing methods.',
      'Can be combined with single-molecule RNA imaging and organelle imaging in a pipeline to build cellular maps.',
      'Designed to be usable by researchers with minimal programming experience (GUI launcher, documentation).',
    ],
    faq: [
      ['What is YeastSAM?', 'A deep learning segmentation framework for budding yeast, built by adapting the Segment Anything Model (SAM).'],
      ['Why is budding yeast hard to segment?', 'Asymmetric division and mother-bud morphology cause dividing cells to be misidentified as two separate cells.'],
      ['Where can I get it?', 'Code: https://github.com/YonghaoZhao722/YeastSAM — Docs: https://yeastsamdoc.readthedocs.io/'],
      ['Who is the first author?', 'Yonghao Zhao.'],
    ],
  },
  {
    slug: 'tsf',
    short: 'TSF',
    title: 'Tackling small sample survival analysis via transfer learning: A study of colorectal cancer prognosis',
    authors: ['Yonghao Zhao', 'Changtao Li', 'Chi Shu', 'Qingbin Wu', 'Hong Li', 'Chuan Xu', 'Tianrui Li', 'Ziqiang Wang', 'Zhipeng Luo', 'Yazhou He'],
    venue: 'Artificial Intelligence in Medicine',
    year: '2026',
    date: '2026/08',
    volume: '178', article: '103426',
    doi: '10.1016/j.artmed.2026.103426',
    pmid: '42019107',
    publisher: 'Elsevier',
    url: 'https://www.sciencedirect.com/science/article/pii/S0933365726000783',
    code: 'https://github.com/YonghaoZhao722/TSF',
    image: '/aim-source-16x9.svg',
    abstract: [
      [null, 'Survival prognosis is crucial for medical informatics. Practitioners often confront small-sized clinical data, especially cancer patient cases, which can be insufficient to induce useful patterns for survival predictions. This study deals with small sample survival analysis by leveraging transfer learning, a useful machine learning technique that can enhance the target analysis with related knowledge pre-learned from other data. We propose and develop various transfer learning methods designed for common survival models. For parametric models such as DeepSurv, Cox-CC (Cox-based neural networks), and DeepHit (end-to-end deep learning model), we apply standard transfer learning techniques like pretraining and fine-tuning. For non-parametric models such as Random Survival Forest, we propose a new transfer survival forest (TSF) model that transfers tree structures from source tasks and fine-tunes them with target data. We evaluated the transfer learning methods on colorectal cancer (CRC) prognosis. The source data are 27,379 SEER CRC stage I patients, and the target data are 728 CRC stage I patients from the West China Hospital. When enhanced by transfer learning, Cox-CC’s Ctd value was boosted from 0.7868 to 0.8111, DeepHit’s from 0.8085 to 0.8135, DeepSurv’s from 0.7722 to 0.8043, and RSF’s from 0.7940 to 0.8297 (the highest performance). All models trained with data as small as 50 demonstrated even more significant improvement. Conclusions: Therefore, the current survival models used for cancer prognosis can be enhanced and improved by properly designed transfer learning techniques.'],
    ],
    tldr: 'Transfer learning from a large registry (SEER) improves survival models trained on a small hospital cohort; the paper introduces the Transfer Survival Forest (TSF), which transfers tree structures and fine-tunes them on target data.',
    keyResults: [
      'Source: 27,379 SEER stage I colorectal cancer patients; target: 728 stage I patients from West China Hospital.',
      'Ctd with transfer learning: Cox-CC 0.7868 → 0.8111, DeepHit 0.8085 → 0.8135, DeepSurv 0.7722 → 0.8043, RSF/TSF 0.7940 → 0.8297 (highest).',
      'Models trained with as few as 50 samples showed even larger improvement.',
    ],
    faq: [
      ['What is the Transfer Survival Forest (TSF)?', 'A transfer-learning version of Random Survival Forest that transfers tree structures learned on source data and fine-tunes them with target data.'],
      ['What data was used?', '27,379 SEER stage I colorectal cancer patients as source and 728 stage I patients from West China Hospital as target.'],
      ['Is the code available?', 'Yes: https://github.com/YonghaoZhao722/TSF'],
      ['Who is the first author?', 'Yonghao Zhao.'],
    ],
  },
]
