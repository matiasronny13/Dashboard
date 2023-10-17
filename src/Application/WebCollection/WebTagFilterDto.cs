namespace Application.WebCollection
{
    public class WebTagFilterDto
    {
        public string? Query { get; set; }
        public int[]? TagFilter { get; set; }

        public string OrderBy { get; set; } = "Title";
        public bool IsAscending { get; set; }
    }
}
