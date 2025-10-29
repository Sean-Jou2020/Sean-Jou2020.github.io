const fs = require("fs");
const path = require("path");

const postsDir = "pages";
const outputFile = "posts.json";

if (!fs.existsSync(postsDir)) {
  console.log("pages 디렉토리가 없습니다. 빈 posts.json을 생성합니다.");
  fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
  process.exit(0);
}

const files = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .sort((a, b) => b.localeCompare(a));

const posts = files.map((filename) => {
  const filePath = path.join(postsDir, filename);
  const content = fs.readFileSync(filePath, "utf8");

  // Front Matter 파싱 - 더 안정적인 방법
  let metadata = {};
  let postContent = content;

  // ---로 시작하고 ---로 끝나는 부분 찾기
  const lines = content.split("\n");
  let frontMatterStart = -1;
  let frontMatterEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      if (frontMatterStart === -1) {
        frontMatterStart = i;
      } else if (frontMatterEnd === -1) {
        frontMatterEnd = i;
        break;
      }
    }
  }

  if (frontMatterStart !== -1 && frontMatterEnd !== -1) {
    // Front Matter 추출
    const frontMatterLines = lines.slice(frontMatterStart + 1, frontMatterEnd);
    postContent = lines.slice(frontMatterEnd + 1).join("\n");

    // Front Matter 파싱
    const frontMatter = frontMatterLines.join("\n");

    // Front Matter 라인 파싱
    const frontMatterLineArray = frontMatter.split("\n");
    frontMatterLineArray.forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // 따옴표 제거
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // 배열 파싱 (tags)
        if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
          try {
            value = JSON.parse(value);
          } catch {
            value = value
              .slice(1, -1)
              .split(",")
              .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
          }
        }

        metadata[key] = value;
      }
    });
  }

  // 발췌문 생성 (첫 200자)
  const excerpt = postContent
    .replace(/#.*$/gm, "") // 헤더 제거
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/\[[\s\S]*?\]/g, "") // 링크 제거
    .replace(/\*\*.*\*\*/g, "") // 볼드 제거
    .replace(/\*.*\*/g, "") // 이탤릭 제거
    .replace(/\n+/g, " ") // 줄바꿈을 공백으로
    .trim()
    .substring(0, 200)
    .trim();

  return {
    file: filename,
    title: metadata.title || filename.replace(".md", ""),
    date: metadata.date || new Date().toISOString().split("T")[0],
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    category: metadata.category || "",
    description: metadata.description || "",
    excerpt: excerpt + (excerpt.length === 200 ? "..." : ""),
  };
});

// 날짜순 정렬 (최신순)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated posts.json with ${posts.length} posts`);
