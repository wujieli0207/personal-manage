module.exports = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // body 以空白行开头
    "body-leading-blank": [2, "always"],
    // footer 以空白行开头
    "footer-leading-blank": [1, "always"],
    // header 最大长度
    "header-max-length": [2, "always", 108],
    // Header 的 type 不能为空
    "type-empty": [2, "never"],
    // Header 的 subject 不能为空
    "subject-empty": [2, "never"],
    // 不限制 subject 的写法（['sentence-case', 'start-case', 'pascal-case', 'upper-case']）
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "chore",
        "ci",
        "revert",
        "wip",
        "types",
      ],
    ],
  },
};
