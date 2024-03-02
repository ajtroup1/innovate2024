var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); // Add MVC services
builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenPolicy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add authentication services
builder.Services.AddAuthentication();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting(); // Use routing
app.UseCors("OpenPolicy");

// Apply the authentication and authorization middleware
app.UseAuthentication(); // This line applies authentication middleware
app.UseAuthorization(); // This line applies authorization middleware

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Map attribute-routed controllers
});

app.Run();
