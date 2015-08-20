package com.washingtonpost.arc.ans.v0_2.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Image" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestImage extends AbstractTest<Image> {
    
    @Override
    String getSchemaName() {
        return "image";
    }

    @Override
    Class getTargetClass() {
        return Image.class;
    }

    @Test
    @Override
    @SuppressWarnings("unchecked")
    public void testEqualsAndHashCode() {
        EqualsVerifier.forClass(getTargetClass())
                .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                .withRedefinedSuperclass()
                .verify();
    }

    @Test
    public void testImageGood() throws Exception {
        testJsonValidation("image-fixture-good", true);
        Image image = testClassSerialization("image-fixture-good");
        assertThat(image.getId(), is("unique ANS id"));
        assertThat(image.getCreatedDate(), is(date("2015-06-25T09:50:50.52Z")));
        assertThat(image.getCredits().size(), is(1));
        assertThat(image.getCredits().get(0).getName(), is("Ansel Adams"));
        assertThat(image.getCredits().get(0).getRole(), is("Photographer"));
        assertThat(image.getLocation(), is("Washington, D.C."));
        assertThat(image.getGeo().getLongitude(), is(-77.0164));
        assertThat(image.getGeo().getLatitude(), is(38.9047));
        assertThat(image.getAddress().getStreetAddress(), is("1600 Pennsylvania Ave"));
        assertThat(image.getAddress().getExtendedAddress(), is("West Wing"));
        assertThat(image.getAddress().getLocality(), is("Washington, D.C."));
        assertThat(image.getAddress().getPostalCode(), is("20002"));
        assertThat(image.getAddress().getCountryName(), is("USA"));
        assertThat(image.getCopyright(), is("(c) 2015, The Washington Post, Inc"));
        assertThat(image.getUrl(), is("https://img.washingtonpost.com/rf/image_908w/2010-2019/"
                + "WashingtonPost/2012/06/29/Outlook/Advance/Images/511969927-363.jpg"));
        assertThat(image.getCaption(), is("US Supreme Court Justice Antonin Scalia testifies "
                + "before the Senate Judiciary Committee"));
        assertThat(image.getSubtitle(), is("Scalia tried to make the court a conservative stronghold. He failed."));
        assertThat(image.getWidth(), is(800));
        assertThat(image.getHeight(), is(640));
        assertThat(image.getTaxonomy().getKeywords().size(), is(1));
        assertThat(image.getTaxonomy().getKeywords().get(0).getKeyword(), is("Supreme Court"));
    }
}
