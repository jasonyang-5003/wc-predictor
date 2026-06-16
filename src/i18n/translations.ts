export type LanguageCode = 'pt-BR' | 'es' | 'en' | 'zh'

export const languageOptions: Array<{ code: LanguageCode; label: string; name: string }> = [
  { code: 'pt-BR', label: 'PT-BR', name: 'Português (Brasil)' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '中文' },
]

type Translation = {
  appTitle: string;
  language: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  startPrediction: string;
  storyPosterSize: string;
  predictionPoster: string;
  myChampionPrediction: string;
  championPick: string;
  chooseTeam: string;
  shareYourStory: string;
  stepChampion: string;
  stepRunnerUp: string;
  chooseChampionTitle: string;
  chooseRunnerUpTitle: string;
  chooseChampionAgain: string;
  champion: string;
  runnerUp: string;
  generatePoster: string;
  generating: string;
  searchTeam: string;
  filterByConfederation: string;
  noTeamsFound: string;
  alreadyChampion: string;
  selected: string;
  result: string;
  predictAgain: string;
  storyPoster: string;
  posterGenerated: string;
  posterSubtitle: string;
  loadingVotes: string;
  downloadPoster: string;
  saved: string;
  share: string;
  copyText: string;
  copied: string;
  shareFallbackText: string;
  shareTitle: string;
  rankingEyebrow: string;
  rankingTitle: string;
  totalVotesPrefix: string;
  totalVotesSuffix: string;
  myChampion: string;
  votesSuffix: string;
  posterTop: string;
  posterPredictionSentence: (champion: string, runnerUp: string) => string;
  confederations: Record<string, string>;
}

export const translations: Record<LanguageCode, Translation> = {
  'pt-BR': {
    appTitle: 'Previsão da Copa do Mundo 2026',
    language: 'Idioma',
    heroEyebrow: 'Previsor da Copa do Mundo 2026',
    heroTitleLine1: 'Preveja sua',
    heroTitleLine2: 'rota ao título',
    heroDescription: 'Escolha seu campeão e vice-campeão da Copa do Mundo 2026 e gere um pôster vertical pronto para compartilhar nos stories.',
    startPrediction: 'Começar previsão',
    storyPosterSize: 'Pôster Story 1080 x 1920',
    predictionPoster: 'Pôster de previsão',
    myChampionPrediction: 'Minha previsão de campeão',
    championPick: 'Escolha de campeão',
    chooseTeam: 'Escolher seleção',
    shareYourStory: 'Compartilhe seu story',
    stepChampion: 'Campeão',
    stepRunnerUp: 'Vice-campeão',
    chooseChampionTitle: 'Escolha seu campeão previsto',
    chooseRunnerUpTitle: 'Escolha seu vice-campeão previsto',
    chooseChampionAgain: 'Escolher campeão novamente',
    champion: 'Campeão',
    runnerUp: 'Vice-campeão',
    generatePoster: 'Gerar pôster',
    generating: 'Gerando...',
    searchTeam: 'Buscar seleção / Search team',
    filterByConfederation: 'Filtrar por confederação',
    noTeamsFound: 'Nenhuma seleção encontrada',
    alreadyChampion: 'Já escolhido como campeão',
    selected: 'Selecionado',
    result: 'Resultado da previsão',
    predictAgain: 'Prever novamente',
    storyPoster: 'Seu pôster para stories',
    posterGenerated: 'Pôster de previsão gerado',
    posterSubtitle: 'Baixe o pôster vertical e compartilhe nas redes sociais.',
    loadingVotes: 'Carregando dados de votação...',
    downloadPoster: 'Baixar pôster',
    saved: 'Salvo',
    share: 'Compartilhar',
    copyText: 'Copiar texto',
    copied: 'Copiado',
    shareFallbackText: 'Meu pôster de previsão da Copa do Mundo 2026 já está pronto.',
    shareTitle: 'Previsão de campeão da Copa do Mundo 2026',
    rankingEyebrow: 'Ranking da comunidade',
    rankingTitle: 'Top 10 de apoio ao campeão',
    totalVotesPrefix: 'Total de ',
    totalVotesSuffix: ' votos',
    myChampion: 'Meu campeão',
    votesSuffix: ' votos',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterPredictionSentence: (champion, runnerUp) => `Minha previsão para campeão e vice da Copa do Mundo 2026 é: ${champion} e ${runnerUp}`,
    confederations: {
      all: 'Todas',
      uefa: 'Europa',
      conmebol: 'América do Sul',
      concacaf: 'América do Norte/Central',
      afc: 'Ásia',
      caf: 'África',
      ofc: 'Oceania',
    },
  },
  es: {
    appTitle: 'Predicción del Mundial 2026',
    language: 'Idioma',
    heroEyebrow: 'Predictor del Mundial 2026',
    heroTitleLine1: 'Predice tu',
    heroTitleLine2: 'camino al título',
    heroDescription: 'Elige tu campeón y subcampeón del Mundial 2026 y genera un póster vertical listo para compartir en stories.',
    startPrediction: 'Empezar predicción',
    storyPosterSize: 'Póster Story 1080 x 1920',
    predictionPoster: 'Póster de predicción',
    myChampionPrediction: 'Mi predicción de campeón',
    championPick: 'Elección de campeón',
    chooseTeam: 'Elegir selección',
    shareYourStory: 'Comparte tu story',
    stepChampion: 'Campeón',
    stepRunnerUp: 'Subcampeón',
    chooseChampionTitle: 'Elige tu campeón previsto',
    chooseRunnerUpTitle: 'Elige tu subcampeón previsto',
    chooseChampionAgain: 'Volver a elegir campeón',
    champion: 'Campeón',
    runnerUp: 'Subcampeón',
    generatePoster: 'Generar póster',
    generating: 'Generando...',
    searchTeam: 'Buscar selección / Search team',
    filterByConfederation: 'Filtrar por confederación',
    noTeamsFound: 'No se encontraron selecciones',
    alreadyChampion: 'Ya elegido como campeón',
    selected: 'Seleccionado',
    result: 'Resultado de la predicción',
    predictAgain: 'Predecir otra vez',
    storyPoster: 'Tu póster para stories',
    posterGenerated: 'Póster de predicción generado',
    posterSubtitle: 'Descarga el póster vertical y compártelo en redes sociales.',
    loadingVotes: 'Cargando datos de votación...',
    downloadPoster: 'Descargar póster',
    saved: 'Guardado',
    share: 'Compartir',
    copyText: 'Copiar texto',
    copied: 'Copiado',
    shareFallbackText: 'Mi póster de predicción del Mundial 2026 ya está listo.',
    shareTitle: 'Predicción de campeón del Mundial 2026',
    rankingEyebrow: 'Ranking de la comunidad',
    rankingTitle: 'Top 10 de apoyo al campeón',
    totalVotesPrefix: 'Total de ',
    totalVotesSuffix: ' votos',
    myChampion: 'Mi campeón',
    votesSuffix: ' votos',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterPredictionSentence: (champion, runnerUp) => `Mi predicción para campeón y subcampeón del Mundial 2026 es: ${champion} y ${runnerUp}`,
    confederations: {
      all: 'Todas',
      uefa: 'Europa',
      conmebol: 'Sudamérica',
      concacaf: 'Norte/Centroamérica',
      afc: 'Asia',
      caf: 'África',
      ofc: 'Oceanía',
    },
  },
  en: {
    appTitle: '2026 World Cup Prediction',
    language: 'Language',
    heroEyebrow: '2026 World Cup Predictor',
    heroTitleLine1: 'Predict your',
    heroTitleLine2: 'road to glory',
    heroDescription: 'Choose your 2026 World Cup champion and runner-up, then generate a vertical poster ready for social stories.',
    startPrediction: 'Start prediction',
    storyPosterSize: '1080 x 1920 Story Poster',
    predictionPoster: 'Prediction poster',
    myChampionPrediction: 'My champion prediction',
    championPick: 'Champion pick',
    chooseTeam: 'Choose team',
    shareYourStory: 'Share your story',
    stepChampion: 'Champion',
    stepRunnerUp: 'Runner-up',
    chooseChampionTitle: 'Choose your predicted champion',
    chooseRunnerUpTitle: 'Choose your predicted runner-up',
    chooseChampionAgain: 'Choose champion again',
    champion: 'Champion',
    runnerUp: 'Runner-up',
    generatePoster: 'Generate poster',
    generating: 'Generating...',
    searchTeam: 'Search team',
    filterByConfederation: 'Filter by confederation',
    noTeamsFound: 'No matching teams found',
    alreadyChampion: 'Already chosen as champion',
    selected: 'Selected',
    result: 'Prediction result',
    predictAgain: 'Predict again',
    storyPoster: 'Your story poster',
    posterGenerated: 'Prediction poster generated',
    posterSubtitle: 'Download the vertical poster and share it on social platforms.',
    loadingVotes: 'Loading vote data...',
    downloadPoster: 'Download poster',
    saved: 'Saved',
    share: 'Share',
    copyText: 'Copy text',
    copied: 'Copied',
    shareFallbackText: 'My 2026 World Cup prediction poster is ready.',
    shareTitle: '2026 World Cup champion prediction',
    rankingEyebrow: 'Community ranking',
    rankingTitle: 'Champion support Top 10',
    totalVotesPrefix: '',
    totalVotesSuffix: ' total votes',
    myChampion: 'My champion',
    votesSuffix: ' votes',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterPredictionSentence: (champion, runnerUp) => `My predicted 2026 World Cup champion and runner-up are: ${champion} and ${runnerUp}`,
    confederations: {
      all: 'All',
      uefa: 'Europe',
      conmebol: 'South America',
      concacaf: 'North/Central America',
      afc: 'Asia',
      caf: 'Africa',
      ofc: 'Oceania',
    },
  },
  zh: {
    appTitle: '2026 世界杯冠军预测',
    language: '语言',
    heroEyebrow: '2026 World Cup Predictor',
    heroTitleLine1: '预测你的',
    heroTitleLine2: '冠军之路',
    heroDescription: '选择你心中的 2026 世界杯冠军与亚军，生成一张适合朋友圈、小红书和 Instagram Story 分享的竖版赛事海报。',
    startPrediction: '开始预测',
    storyPosterSize: '1080 x 1920 Story Poster',
    predictionPoster: '预测海报',
    myChampionPrediction: '我的冠军预测',
    championPick: '冠军选择',
    chooseTeam: '选择球队',
    shareYourStory: '分享你的故事',
    stepChampion: '冠军',
    stepRunnerUp: '亚军',
    chooseChampionTitle: '选择你预测的冠军',
    chooseRunnerUpTitle: '选择你预测的亚军',
    chooseChampionAgain: '重新选择冠军',
    champion: '冠军',
    runnerUp: '亚军',
    generatePoster: '生成海报',
    generating: '生成中...',
    searchTeam: '搜索球队 / Search team',
    filterByConfederation: '按赛区筛选',
    noTeamsFound: '没有找到匹配的球队',
    alreadyChampion: '已选为冠军',
    selected: '已选择',
    result: '预测结果',
    predictAgain: '再预测一次',
    storyPoster: '你的分享海报',
    posterGenerated: '预测海报已生成',
    posterSubtitle: '下载竖版海报，直接分享到社交平台。',
    loadingVotes: '正在加载投票数据...',
    downloadPoster: '下载海报',
    saved: '已保存',
    share: '分享',
    copyText: '复制文案',
    copied: '已复制',
    shareFallbackText: '我的 2026 世界杯冠军预测海报已生成。',
    shareTitle: '2026 世界杯冠军预测',
    rankingEyebrow: '社区排行榜',
    rankingTitle: '冠军支持率 Top 10',
    totalVotesPrefix: '共 ',
    totalVotesSuffix: ' 票',
    myChampion: '我的冠军',
    votesSuffix: ' 票',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterPredictionSentence: (champion, runnerUp) => `我预测的2026世界杯冠军和亚军为：${champion} 和 ${runnerUp}`,
    confederations: {
      all: '全部',
      uefa: '欧洲',
      conmebol: '南美洲',
      concacaf: '中北美',
      afc: '亚洲',
      caf: '非洲',
      ofc: '大洋洲',
    },
  },
}
