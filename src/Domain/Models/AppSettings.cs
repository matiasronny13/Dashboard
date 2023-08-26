namespace Domain.Models
{
    public class AppSettings
    {
        public AppSettings() {
            Bookmark = new Bookmark();
        }

        public Bookmark Bookmark { get; set; }
    }

    public class Bookmark
    {
        public IDictionary<string, string> FilePaths { get; set; }
    }
}
