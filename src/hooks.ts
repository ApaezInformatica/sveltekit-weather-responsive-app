// Array de strings que identifican bots conocidos
const botIdentifiers = [
    'bot',
    'crawler',
    'spider',
    'crawling',
    'Googlebot',
    'Bingbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Sogou',
    'Exabot',
    'facebot',
    'ia_archiver'
];

export async function handle({ event, resolve }:any) {
    const request = event.request;

    // Obtener la dirección IP del cliente de varias maneras seguras
    const clientIp = request.headers.get('x-forwarded-for') ||
        request.headers.get('client-ip') ||
        request.socket?.remoteAddress ||
        '127.0.0.1'; // Valor predeterminado para pruebas en localhost

    // Obtener el User-Agent
    const userAgent = request.headers.get('user-agent') || 
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'; // Valor predeterminado para pruebas

    // Verificar si el User-Agent corresponde a un bot
    const isBot = botIdentifiers.some(botIdentifier => userAgent.toLowerCase().includes(botIdentifier.toLowerCase()));
    const botName = isBot ? botIdentifiers.find(botIdentifier => userAgent.toLowerCase().includes(botIdentifier.toLowerCase())) : null;

    // Obtener la fecha y hora de la solicitud
    const requestTime = new Date().toISOString();

    // Log de la información de la solicitud
    console.log({
        url: event.url.pathname,
        clientIp,
        userAgent,
        requestTime,
        isBot,
        botName
    });

    // Proceed with the request
    const response = await resolve(event);
    return response;
}