
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * A collection.
 * <p>
 * Holds attributes of an ANS collection.
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Collection extends Content {

    @JsonProperty("canonical_url")
    private String canonicalUrl;

    @JsonProperty("short_url")
    private String shortUrl;

    @JsonProperty("headlines")
    private List<Headline> headlines;

    @JsonProperty("description")
    private String description;

    @JsonProperty("status")
    private String status;

    @JsonProperty("related_content")
    private List<Id> relatedContent;

    @JsonProperty("promo_images")
    private List<Image> promoImages;

    @JsonProperty("taxonomy")
    private Taxonomy taxonomy;

    @JsonProperty("publish_date")
    private String publishDate;

    @JsonProperty("display_date")
    private String displayDate;

    @JsonProperty("content_elements")
    private List<? extends ContentElement> contentElements;

    @JsonProperty("editor_note")
    private String editorNote;

    /**
     * @return The fully qualified URL to the collection.
     */
    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    /**
     * @param canonicalUrl The fully qualified URL to the collection.
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
     * @return The headlines for this collection.
     */
    public List<Headline> getHeadlines() {
        return headlines;
    }

    /**
     * @param headlines The headlines for this collection.
     */
    public void setHeadline(List<Headline> headlines) {
        this.headlines = headlines;
    }

    /**
     * @return A description of the collection.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description A description of the collection.
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
     * @param status Optional field to store collection workflow related status (e.g. published/embargoed/etc)
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return A list of IDs referencing other content items this collection is related to.
     */
    public List<Id> getRelatedContent() {
        return relatedContent;
    }

    /**
     * @param relatedContent A list of IDs referencing other content items this collection is related to.
     */
    public void setRelatedContent(List<Id> relatedContent) {
        this.relatedContent = relatedContent;
    }

    /**
     * @return List of promotional images to use when highlighting the collection.
     */
    public List<Image> getPromoImages() {
        return promoImages;
    }

    /**
     * @param promoImages List of promotional images to use when highlighting the collection.
     */
    public void setPromoImages(List<Image> promoImages) {
        this.promoImages = promoImages;
    }

    /**
     * @return A collection of metadata, keywords, etc. describing this collection.
     */
    public Taxonomy getTaxonomy() {
        return taxonomy;
    }

    /**
     * @param taxonomy A collection of metadata, keywords, etc. describing this collection.
     */
    public void setTaxonomy(Taxonomy taxonomy) {
        this.taxonomy = taxonomy;
    }

    /**
     * @return When the story was first published.
     */
    public String getPublishDate() {
        return publishDate;
    }

    @JsonIgnore
    public Instant getPublishDateAsInstant() {
        return Instant.parse(this.publishDate);
    }

    /**
     * @param publishDate When the collection was first published.
     */
    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }

    /**
     * @return The RFC3339-formatted dated time of the most recent date the collection was (re)displayed on a public site.
     */
    public String getDisplayDate() {
        return displayDate;
    }

    @JsonIgnore
    public Instant getDisplayDateAsInstant() {
        return Instant.parse(this.displayDate);
    }

    /**
     * @param displayDate The RFC3339-formatted dated time of the most recent date the collection was (re)displayed on a public site.
     */
    public void setDisplayDate(String displayDate) {
        this.displayDate = displayDate;
    }

    /**
     * @return An ordered list of the elements that make up the content (i.e. "the meat of the collection") for this Object
     */
    public List<? extends ANS> getContentElements() {
        return contentElements;
    }

    /**
     * @param contentElements An ordered list of the elements that make up the content (i.e. "the meat of the collection") for this
     */
    public void setContentElements(List<? extends ContentElement> contentElements) {
        this.contentElements = contentElements;
    }

    /**
     * @return Additional information to be displayed in/near the collection html content from the editor.
     */
    public String getEditorNote() {
        return editorNote;
    }

    /**
     * @param editorNote Additional information to be displayed in/near the collection html content from the editor.
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
                .append(this.headlines)
                .append(this.contentElements)
                .append(this.promoImages)
                .append(this.publishDate)
                .append(this.relatedContent)
                .append(this.shortUrl)
                .append(this.status)
                .append(this.taxonomy)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Collection) == false) {
            return false;
        }
        Collection that = ((Collection) other);
        return that.canEqual(this) &&
                new EqualsBuilder()
                .append(this.canonicalUrl, that.canonicalUrl)
                .append(this.description, that.description)
                .append(this.displayDate, that.displayDate)
                .append(this.editorNote, that.editorNote)
                .append(this.headlines, that.headlines)
                .append(this.contentElements, that.contentElements)
                .append(this.promoImages, that.promoImages)
                .append(this.publishDate, that.publishDate)
                .append(this.relatedContent, that.relatedContent)
                .append(this.shortUrl, that.shortUrl)
                .append(this.status, that.status)
                .append(this.taxonomy, that.taxonomy)
                .appendSuper(super.equals(other))
                .isEquals();
    }

    @Override
    public boolean canEqual(Object other) {
        return (other instanceof Collection);
    }
}
