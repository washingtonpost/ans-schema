
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * A video.
 * <p>
 * Holds attributes of an ANS video component.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Video extends Media {

    @JsonProperty("description")
    private String description;

    @JsonProperty("duration")
    private long duration;

    @JsonProperty("transcript")
    private String transcript;

    @JsonProperty("rating")
    private String rating;

    @JsonProperty("type")
    private String type;

    @JsonProperty("youtubeContentId")
    private String youtubeContentId;

    @JsonProperty("streams")
    private List<VideoStream> streams;

    @JsonProperty("promo_image")
    private Image promoImage;

    /**
     * @return Description for the video.
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description Description for the video.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return Runtime of the video in milliseconds.
     */
    public long getDuration() {
        return duration;
    }

    /**
     * @param duration Runtime of the video in milliseconds.
     */
    public void setDuration(long duration) {
        this.duration = duration;
    }

    /**
     * @return A transcript of the contents of the video.
     */
    public String getTranscript() {
        return transcript;
    }

    /**
     * @param transcript A transcript of the contents of the video.
     */
    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    /**
     * @return A rating of the video, to be used for appropriate age/content warnings.
     */
    public String getRating() {
        return rating;
    }

    /**
     * @param rating A rating of the video, to be used for appropriate age/content warnings.
     */
    public void setRating(String rating) {
        this.rating = rating;
    }

    /**
     * @return The type of video (e.g. clip, livestream, etc)
     */
    public String getType() {
        return type;
    }

    /**
     * @param type The type of video (e.g. clip, livestream, etc)
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return The YouTube ID of the content, if (re)hosted on youtube.com
     */
    public String getYoutubeContentId() {
        return youtubeContentId;
    }

    /**
     * @param youtubeContentId The YouTube ID of the content, if (re)hosted on youtube.com
     */
    public void setYoutubeContentId(String youtubeContentId) {
        this.youtubeContentId = youtubeContentId;
    }

    /**
     * @return The different streams this video can play in.
     */
    public List<VideoStream> getStreams() {
        return streams;
    }

    /**
     * @param streams The different streams this video can play in.
     */
    public void setStreams(List<VideoStream> streams) {
        this.streams = streams;
    }

    /**
     * @return A promo/leader image to the video.
     */
    public Image getPromoImage() {
        return promoImage;
    }

    /**
     * @param promoImage A promo/leader image to the video.
     */
    public void setPromoImage(Image promoImage) {
        this.promoImage = promoImage;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(this.description)
                .append(this.duration)
                .append(this.promoImage)
                .append(this.rating)
                .append(this.streams)
                .append(this.transcript)
                .append(this.type)
                .append(this.youtubeContentId)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Video) == false) {
            return false;
        }
        Video rhs = ((Video) other);
        return new EqualsBuilder()
                .append(this.description, rhs.description)
                .append(this.duration, rhs.duration)
                .append(this.promoImage, rhs.promoImage)
                .append(this.rating, rhs.rating)
                .append(this.streams, rhs.streams)
                .append(this.transcript, rhs.transcript)
                .append(this.type, rhs.type)
                .append(this.youtubeContentId, rhs.youtubeContentId)
                .appendSuper(super.equals(other))
                .isEquals();
    }

}
