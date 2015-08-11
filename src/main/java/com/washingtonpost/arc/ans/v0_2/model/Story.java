
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * A story.
 * <p>
 * Holds attributes of an ANS story.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Story extends Content {

    @JsonProperty("canonical_url")
    private String canonicalUrl;

    @JsonProperty("short_url")
    private String shortUrl;

    @JsonProperty("title")
    private String title;

    @JsonProperty("headline")
    private String headline;

    @JsonProperty("description")
    private String description;

    @JsonProperty("status")
    private String status;

    @JsonProperty("related_content")
    private List<TraitGuid> relatedContent;

    @JsonProperty("promo_images")
    private List<Image> promoImages;

    @JsonProperty("taxonomy")
    private Taxonomy taxonomy;

    @JsonProperty("publish_date")
    private Date publishDate;

    @JsonProperty("display_date")
    private Date displayDate;

    @JsonProperty("html")
    private String html;

    @JsonProperty("editor_note")
    private String editorNote;

    /**
     * @return The fully qualified URL to the story.
     */
    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    /**
     * @param canonicalUrl The fully qualified URL to the story.
     */
    public void setCanonicalUrl(String canonicalUrl) {
        this.canonicalUrl = canonicalUrl;
    }

    /**
     * @return A url-shorterned version of the canonical_url.
     */
    public String getShortUrl() {
        return shortUrl;
    }

    /**
     * @param shortUrl A url-shorterned version of the canonical_url.
     */
    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    /**
     * @return The title of the story.
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title The title of the story.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return The headline for the story.
     */
    public String getHeadline() {
        return headline;
    }

    /**
     * @param headline The headline for the story.
     */
    public void setHeadline(String headline) {
        this.headline = headline;
    }

    /**
     * @return A description of the story.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description A description of the story.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return Optional field to store story workflow related status (e.g. published/embargoed/etc)
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status Optional field to store story workflow related status (e.g. published/embargoed/etc)
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return A list of GUIDs referencing other content items this story is related to.
     */
    public List<TraitGuid> getRelatedContent() {
        return relatedContent;
    }

    /**
     * @param relatedContent A list of GUIDs referencing other content items this story is related to.
     */
    public void setRelatedContent(List<TraitGuid> relatedContent) {
        this.relatedContent = relatedContent;
    }

    /**
     * @return List of promotional images to use when highlighting the story.
     */
    public List<Image> getPromoImages() {
        return promoImages;
    }

    /**
     * @param promoImages List of promotional images to use when highlighting the story.
     */
    public void setPromoImages(List<Image> promoImages) {
        this.promoImages = promoImages;
    }

    /**
     * @return A collection of metadata, keywords, etc. describing this story.
     */
    public Taxonomy getTaxonomy() {
        return taxonomy;
    }

    /**
     * @param taxonomy A collection of metadata, keywords, etc. describing this story.
     */
    public void setTaxonomy(Taxonomy taxonomy) {
        this.taxonomy = taxonomy;
    }

    /**
     * @return When the story was first published.
     */
    public Date getPublishDate() {
        return publishDate;
    }

    /**
     * @param publishDate When the story was first published.
     */
    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    /**
     * @return The RFC3339-formatted dated time of the most recent date the story was (re)displayed on a public site.
     */
    public Date getDisplayDate() {
        return displayDate;
    }

    /**
     * @param displayDate The RFC3339-formatted dated time of the most recent date the story was (re)displayed on a public site.
     */
    public void setDisplayDate(Date displayDate) {
        this.displayDate = displayDate;
    }

    /**
     * @return For now, just the clob of HTML that is the story; to be made finer-grain in the future.
     */
    public String getHtml() {
        return html;
    }

    /**
     * @param html For now, just the clob of HTML that is the story; to be made finer-grain in the future.
     */
    public void setHtml(String html) {
        this.html = html;
    }

    /**
     * @return Additional information to be displayed in/near the story html content from the editor.
     */
    public String getEditorNote() {
        return editorNote;
    }

    /**
     * @param editorNote Additional information to be displayed in/near the story html content from the editor.
     */
    public void setEditorNote(String editorNote) {
        this.editorNote = editorNote;
    }




    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(this.canonicalUrl)
                .append(this.description)
                .append(this.displayDate)
                .append(this.editorNote)
                .append(this.headline)
                .append(this.html)
                .append(this.promoImages)
                .append(this.publishDate)
                .append(this.relatedContent)
                .append(this.shortUrl)
                .append(this.status)
                .append(this.taxonomy)
                .append(this.title)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Story) == false) {
            return false;
        }
        Story rhs = ((Story) other);
        return new EqualsBuilder()
                .append(this.canonicalUrl, rhs.canonicalUrl)
                .append(this.description, rhs.description)
                .append(this.displayDate, rhs.displayDate)
                .append(this.editorNote, rhs.editorNote)
                .append(this.headline, rhs.headline)
                .append(this.html, rhs.html)
                .append(this.promoImages, rhs.promoImages)
                .append(this.publishDate, rhs.publishDate)
                .append(this.relatedContent, rhs.relatedContent)
                .append(this.shortUrl, rhs.shortUrl)
                .append(this.status, rhs.status)
                .append(this.taxonomy, rhs.taxonomy)
                .append(this.title, rhs.title)
                .appendSuper(super.equals(other))
                .isEquals();
    }
}
