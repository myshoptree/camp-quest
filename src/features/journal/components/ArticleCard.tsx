import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import type { Article } from '../data/schemas'
import { pickIntl } from '../../content/data/schemas'
import { useLocale } from '../../../i18n/useLocale'

export function ArticleCard({
  article,
  variant = 'default',
}: {
  article: Article
  variant?: 'default' | 'feature'
}) {
  const { t } = useTranslation('journal')
  const { locale } = useLocale()
  const isFeature = variant === 'feature'
  const title = pickIntl(article.title, locale)
  const excerpt = pickIntl(article.excerpt, locale)

  return (
    <Link
      to="/journal/$slug"
      params={{ slug: article.slug }}
      className={`group block overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isFeature ? 'md:grid md:grid-cols-2 md:gap-0' : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-neutral-100 ${
          isFeature ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={article.coverUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div
        className={`flex flex-col gap-3 p-6 ${
          isFeature ? 'md:justify-center md:p-10' : ''
        }`}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink/50">
          <span>{t(`categories.${article.category}`)}</span>
          <span>·</span>
          <span>
            {t('article.readMinutes', { minutes: article.readMinutes })}
          </span>
          {article.difficulty ? (
            <>
              <span>·</span>
              <span>{t(`difficulty.${article.difficulty}`)}</span>
            </>
          ) : null}
        </div>
        <h3
          className={`font-display font-semibold tracking-tight text-ink ${
            isFeature ? 'text-3xl md:text-4xl' : 'text-xl'
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-ink/60 line-clamp-3">{excerpt}</p>
        <p className="mt-1 text-xs text-ink/50">
          {locale === 'es' ? 'Por' : 'By'} {article.author}
        </p>
      </div>
    </Link>
  )
}
