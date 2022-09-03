namespace Hooshabi.Server.Application.Identity.Tokens;

public record RefreshTokenRequest(string Token, string RefreshToken);