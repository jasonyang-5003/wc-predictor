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
  predictorNameLabel: string;
  predictorNamePlaceholder: string;
  predictorNameRequired: string;
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
  rankingSource: string;
  noRankingData: string;
  totalVotesPrefix: string;
  totalVotesSuffix: string;
  myChampion: string;
  votesSuffix: string;
  rewardPathTitle: string;
  rewardSteps: string[];
  rewardCardTitle: string;
  rewardCardBody: string;
  joinDiscord: string;
  posterTop: string;
  posterMasterLabel: string;
  posterPredictionSentence: (champion: string, runnerUp: string) => string;
  confederations: Record<string, string>;
}

export const translations: Record<LanguageCode, Translation> = {
  'pt-BR': {
    appTitle: 'Previsão da Copa do Mundo 2026',
    language: 'Idioma',
    heroEyebrow: 'Predictor da Copa do Mundo 2026',
    heroTitleLine1: 'Preveja sua',
    heroTitleLine2: 'rota ao título',
    heroDescription: 'Escolha seu campeão e vice da Copa do Mundo 2026, gere um pôster vertical de evento e compartilhe para ganhar recompensas GVIP & ROBUX.',
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
    predictorNameLabel: 'Seu nome',
    predictorNamePlaceholder: 'Digite seu nome para o pôster',
    predictorNameRequired: 'Digite seu nome antes de gerar o pôster.',
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
    posterSubtitle: '',
    loadingVotes: 'Carregando escolhas dos participantes...',
    downloadPoster: 'Baixar pôster',
    saved: 'Salvo',
    share: 'Compartilhar',
    copyText: 'Copiar texto',
    copied: 'Copiado',
    shareFallbackText: 'Meu pôster de previsão da Copa do Mundo 2026 está pronto.',
    shareTitle: 'Previsão de campeão da Copa do Mundo 2026',
    rankingEyebrow: 'Escolhas reais dos participantes',
    rankingTitle: 'Top 5 de campeões mais escolhidos',
    rankingSource: 'Dados baseados apenas nas escolhas enviadas neste site/dispositivo.',
    noRankingData: 'Ainda não há escolhas suficientes. Gere o primeiro pôster para iniciar o ranking.',
    totalVotesPrefix: '',
    totalVotesSuffix: ' escolhas reais',
    myChampion: 'Meu campeão',
    votesSuffix: ' escolhas',
    rewardPathTitle: 'Como resgatar recompensas',
    rewardSteps: ['Baixar pôster', 'Compartilhar no Discord oficial', 'Preencher o formulário', 'Receber GVIP e concorrer a ROBUX'],
    rewardCardTitle: '🎁 Depois de gerar, há mais recompensas esperando!',
    rewardCardBody: 'Entre no Discord da UgPhone, compartilhe sua previsão, receba um código exclusivo e participe dos sorteios de Robux e GVIP.',
    joinDiscord: 'Entrar no Discord',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterMasterLabel: 'Mestre da previsão',
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
    heroDescription: 'Elige tu campeón y subcampeón del Mundial 2026, genera un póster vertical de evento y compártelo para ganar recompensas GVIP & ROBUX.',
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
    predictorNameLabel: 'Tu nombre',
    predictorNamePlaceholder: 'Escribe tu nombre para el póster',
    predictorNameRequired: 'Escribe tu nombre antes de generar el póster.',
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
    posterSubtitle: '',
    loadingVotes: 'Cargando elecciones de participantes...',
    downloadPoster: 'Descargar póster',
    saved: 'Guardado',
    share: 'Compartir',
    copyText: 'Copiar texto',
    copied: 'Copiado',
    shareFallbackText: 'Mi póster de predicción del Mundial 2026 ya está listo.',
    shareTitle: 'Predicción de campeón del Mundial 2026',
    rankingEyebrow: 'Elecciones reales de participantes',
    rankingTitle: 'Top 5 de campeones más elegidos',
    rankingSource: 'Datos basados solo en las elecciones enviadas en este sitio/dispositivo.',
    noRankingData: 'Aún no hay suficientes elecciones. Genera el primer póster para iniciar el ranking.',
    totalVotesPrefix: '',
    totalVotesSuffix: ' elecciones reales',
    myChampion: 'Mi campeón',
    votesSuffix: ' elecciones',
    rewardPathTitle: 'Cómo reclamar recompensas',
    rewardSteps: ['Descargar póster', 'Compartir en el Discord oficial', 'Completar el formulario', 'Recibir GVIP y participar por ROBUX'],
    rewardCardTitle: '🎁 ¡Después de generar, hay más recompensas para ti!',
    rewardCardBody: 'Únete al Discord de UgPhone, comparte tu predicción, recibe un código exclusivo y participa en sorteos de Robux y GVIP.',
    joinDiscord: 'Unirse a Discord',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterMasterLabel: 'Maestro de predicción',
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
    heroDescription: 'Choose your 2026 World Cup champion and runner-up, generate a vertical event poster, and share it to win GVIP & ROBUX rewards.',
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
    predictorNameLabel: 'Your name',
    predictorNamePlaceholder: 'Enter your name for the poster',
    predictorNameRequired: 'Enter your name before generating the poster.',
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
    posterSubtitle: '',
    loadingVotes: 'Loading participant picks...',
    downloadPoster: 'Download poster',
    saved: 'Saved',
    share: 'Share',
    copyText: 'Copy text',
    copied: 'Copied',
    shareFallbackText: 'My 2026 World Cup prediction poster is ready.',
    shareTitle: '2026 World Cup champion prediction',
    rankingEyebrow: 'Real participant picks',
    rankingTitle: 'Top 5 most picked champions',
    rankingSource: 'Data is based only on choices submitted on this site/device.',
    noRankingData: 'Not enough picks yet. Generate the first poster to start the ranking.',
    totalVotesPrefix: '',
    totalVotesSuffix: ' real picks',
    myChampion: 'My champion',
    votesSuffix: ' picks',
    rewardPathTitle: 'Reward path',
    rewardSteps: ['Download poster', 'Share in official Discord', 'Fill out the form', 'Claim GVIP and enter ROBUX draw'],
    rewardCardTitle: '🎁 More rewards after you generate!',
    rewardCardBody: 'Join the UgPhone Discord, share your prediction result, get an exclusive redemption code, and enter Robux and GVIP giveaways.',
    joinDiscord: 'Join Discord',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterMasterLabel: 'Prediction master',
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
    heroDescription: '选择你心中的 2026 世界杯冠军与亚军，生成竖版赛事海报并分享，赢取GVIP&ROBUX奖励。',
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
    predictorNameLabel: '你的名字',
    predictorNamePlaceholder: '输入要显示在海报上的名字',
    predictorNameRequired: '生成海报前请先填写名字。',
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
    posterSubtitle: '',
    loadingVotes: '正在加载参与者选择...',
    downloadPoster: '下载海报',
    saved: '已保存',
    share: '分享',
    copyText: '复制文案',
    copied: '已复制',
    shareFallbackText: '我的 2026 世界杯冠军预测海报已生成。',
    shareTitle: '2026 世界杯冠军预测',
    rankingEyebrow: '本网站参与者真实选择',
    rankingTitle: '冠军支持率 Top 5',
    rankingSource: '数据仅统计本网站/当前设备已提交的真实选择，不使用虚构数据。',
    noRankingData: '暂无足够选择数据。生成第一张海报后即可开始统计。',
    totalVotesPrefix: '共 ',
    totalVotesSuffix: ' 次真实选择',
    myChampion: '我的冠军',
    votesSuffix: ' 次选择',
    rewardPathTitle: '领取奖励路径',
    rewardSteps: ['下载海报', '在官方 Discord 中分享', '填写表单', '领取 GVIP 奖励，抽 ROBUX'],
    rewardCardTitle: '🎁 生成结束后，还有更多奖励等你！',
    rewardCardBody: '加入 UgPhone Discord，分享你的预测结果，获得专属兑换码，并参与 Robux 和 GVIP 抽奖。',
    joinDiscord: '加入 Discord',
    posterTop: '2026 WORLD CUP PREDICTION',
    posterMasterLabel: '预测大师',
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
