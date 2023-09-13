namespace Domain.Models
{
    public class AppSettings
    {
        public AppSettings() {}

        public Bookmark Bookmark { get; set; } = new Bookmark();
        public WebCollection WebCollection { get; set; } = new WebCollection();
    }

    public class Bookmark
    {
        public IDictionary<string, string> FilePaths { get; set; }
    }

    public class WebCollection
    {
        public string ThumbnailPath { get; set; }
    }
}
