import {
  PROJECTS,
  SKILL_EXTRA_USAGE,
  SKILL_PROJECT_RULES,
  SKILL_TAG_ALIASES,
  type ProjectItem,
} from './content';

export function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+#.]/g, '');
}

function aliasesFor(skillName: string): string[] {
  const entry = Object.entries(SKILL_TAG_ALIASES).find(
    ([name]) => normalize(name) === normalize(skillName)
  );
  return entry ? entry[1] : [];
}

export function tagMatchesSkill(tag: string, skillName: string): boolean {
  const normalizedTag = normalize(tag);
  return [skillName, ...aliasesFor(skillName)].some(
    (candidate) => normalize(candidate) === normalizedTag
  );
}

export function getSkillProjects(skillName: string): ProjectItem[] {
  const rule = Object.entries(SKILL_PROJECT_RULES).find(
    ([name]) => normalize(name) === normalize(skillName)
  )?.[1];

  return PROJECTS.filter((project) => {
    const directMatch = project.tags.some((tag) => tagMatchesSkill(tag, skillName));
    if (directMatch) return true;
    if (!rule) return false;
    if (rule.type === 'all') return true;
    if (rule.type === 'deployed') return Boolean(project.liveUrl);
    return project.tags.some((tag) =>
      rule.tags.some((ruleTag) => normalize(tag) === normalize(ruleTag))
    );
  });
}

export function getSkillExtras(skillName: string): { label: string; href: string }[] {
  return Object.entries(SKILL_EXTRA_USAGE).find(
    ([name]) => normalize(name) === normalize(skillName)
  )?.[1] ?? [];
}
